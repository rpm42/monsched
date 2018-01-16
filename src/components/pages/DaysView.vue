<template>
<v-layout column>
  <v-dialog v-model="serviceFormDialog" persistent max-width="600px">
    <service-form :context="serviceFormContext" />
  </v-dialog>
  <v-dialog v-model="dayFormDialog" persistent max-width="800px">
    <day-form :context="dayFormContext" />
  </v-dialog>
  <v-toolbar color="blue-grey darken-3" dark flat dense app>
    <v-toolbar-title>{{weeks[date].name}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat color="cyan" @click="$router.push(`/${date}/yaml`)">YAML</v-btn>
      <v-btn flat color="orange" @click="$router.push(`/${date}/preview`)">Просмотр</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-flex xs12 v-for="dindex in 7" :key="`d-${dindex}`" :class="{pagebreak: days[date][dindex].pagebreak}">
    <v-card class="elevation-1 mb-3">
      <v-toolbar flat dense card>
        <v-toolbar-title>{{formatDate(date, dindex)}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn flat color="teal lighten-2" @click="editDay(days[date][dindex])">Редактировать</v-btn>
          <v-btn flat color="green" @click="createService(dindex)">Добавить службу</v-btn>
        </v-toolbar-items>
        <!-- <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
      </v-toolbar>
      <v-card-title class="blue-grey darken-1">
        <p class="subheading mb-0" v-html="days[date][dindex].description"></p>
      </v-card-title>
      <v-card-text class="pa-0 ma-0">
        <v-data-table :headers="headers" :items="days[date][dindex].services" hide-actions>
          <template slot="items" slot-scope="props">
            <tr :class="{boldline: props.item.divider}">
              <td class="text-xs-center" width="10%">{{ props.item.time }}</td>
              <td class="text-xs-center" width="5%">{{ props.item.church }}</td>
              <td class="text-xs-left">{{ props.item.service }}</td>
              <td class="text-xs-left" width="20%">{{ props.item.priest }}</td>
              <td class="text-xs-left" width="20%">
                <v-layout row>
                  <v-btn small @click="serviceUp(days[date][dindex], props.index)" flat icon color="blue lighten-2" class="mx-0"><v-icon>mdi-arrow-up</v-icon></v-btn>
                  <v-btn small @click="serviceDown(days[date][dindex], props.index)" flat icon color="blue lighten-2" class="mx-0"><v-icon>mdi-arrow-down</v-icon></v-btn>
                  <v-btn small @click="editService(days[date][dindex], props.index)" flat icon color="teal lighten-2" class="mx-0"><v-icon>mdi-lead-pencil</v-icon></v-btn>
                  <v-btn small @click="deleteService(days[date][dindex], props.index)" flat icon color="brown lighten-2" class="mx-0"><v-icon>mdi-delete</v-icon></v-btn>
                </v-layout>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'
import moment from 'moment'
import { mapState } from 'vuex'
import ServiceForm from '@/components/ui/ServiceForm2'
import DayForm from '@/components/ui/DayForm'

moment.locale('ru')

export default {
  name: 'DaysView',
  props: ['date'],
  data () {
    return {
      serviceFormDialog: false,
      dayFormDialog: false,
      serviceFormContext: null,
      dayFormContext: null,
      headers: [
        { text: 'Время', align: 'center', sortable: false, value: 'time' },
        { text: 'Храм', align: 'center', sortable: false, value: 'church' },
        { text: 'Служба', align: 'center', sortable: false, value: 'title' },
        { text: 'Свящeнник', align: 'center', sortable: false, value: 'priest' },
        { text: 'Управление', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({
      weeks: state => state.weeks,
      days: state => state.days
    })
  },
  methods: {
    formatDate (date, index) {
      return _.capitalize(moment(date, 'YYYY-MM-DD').add(index - 1, 'd').format('dddd, D MMMM, YYYY'))
    },
    serviceUp (dayObj, sindex) {
      console.log(dayObj, sindex)
      if (sindex === 0) {
        return
      }
      let services = [...dayObj.services]
      services[sindex - 1] = dayObj.services[sindex]
      services[sindex] = dayObj.services[sindex - 1]
      Vue.set(dayObj, 'services', services)
      this.$store.commit('SET_DAY', dayObj)
    },
    serviceDown (dayObj, sindex) {
      console.log(dayObj, sindex)
      if (sindex === dayObj.services.length - 1) {
        return
      }
      let services = [...dayObj.services]
      services[sindex + 1] = dayObj.services[sindex]
      services[sindex] = dayObj.services[sindex + 1]
      Vue.set(dayObj, 'services', services)
      this.$store.commit('SET_DAY', dayObj)
    },
    deleteService (dayObj, sindex) {
      if (sindex < 0 || sindex > dayObj.services.length - 1) {
        return
      }
      if (!confirm('Точно удалить?')) {
        return
      }
      const services = _.filter(dayObj.services, (s, i) => { return i !== sindex })
      dayObj.services = services
      this.$store.commit('SET_DAY', dayObj)
    },
    createService (day) {
      new Promise((resolve, reject) => {
        this.serviceFormContext = {
          date: this.date,
          day,
          resolve,
          reject
        }
        this.serviceFormDialog = true
      }).then((newService) => {
        this.serviceFormDialog = false
        console.log('service', newService)
        this.$store.commit('ADD_SERVICE', {
          week: this.date,
          day: day,
          service: newService
        })
        this.serviceFormContext = null
      }).catch(() => {
        this.serviceFormDialog = false
        this.serviceFormContext = null
      })
    },
    editService (dayObj, sindex) {
      new Promise((resolve, reject) => {
        this.serviceFormContext = {
          title: 'Редактировать службу',
          date: this.date,
          day: dayObj.index,
          service: dayObj.services[sindex],
          resolve,
          reject
        }
        this.serviceFormDialog = true
      }).then((newService) => {
        this.serviceFormDialog = false
        this.$store.commit('EDIT_SERVICE', {
          week: dayObj.week,
          day: dayObj.index,
          index: sindex,
          service: newService
        })
        this.serviceFormContext = null
      }).catch(() => {
        this.serviceFormDialog = false
        this.serviceFormContext = null
      })
    },
    editDay (dayObj) {
      new Promise((resolve, reject) => {
        this.dayFormContext = {
          dayObj,
          resolve,
          reject
        }
        this.dayFormDialog = true
      }).then((dayInfo) => {
        const newDayObj = {
          ...dayObj,
          ...dayInfo
        }
        this.dayFormDialog = false
        this.$store.commit('SET_DAY', newDayObj)
        this.dayFormContext = null
      }).catch(() => {
        this.dayFormDialog = false
        this.dayFormContext = null
      })
    }
  },
  components: {
    'day-form': DayForm,
    'service-form': ServiceForm
  }
}
</script>

<style lang="sass">
.boldline
  border-top: 3px solid

.pagebreak
  position: relative
  margin-top: 40px
  &:before
    font-family: Menlo
    content: ""
    text-align: center
    position: absolute
    left: 0
    right: 0
    top: -25px
    border-bottom: 3px dashed #DD2C00
    z-index: 1

table.table thead th
  font-size: 16px
table.table tbody td
  font-size: 15px

.card__title p:last-child
  margin-bottom: 0
</style>
