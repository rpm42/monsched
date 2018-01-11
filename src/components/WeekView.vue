<template>
  <section class="container">
    <div class="container" v-if="yaml">
      <div>
        <router-link to="/">&lt;- Back</router-link>
        <router-link :to="$route.path" replace>HIDE YAML</router-link>
      </div>
      <h2>YamlView</h2>
      <div class="yaml-container">
        <yamledit :data="days[date]" :validate="validate" @save="onYamlSave"/>
      </div>
    </div>
    <div v-else>
      <router-link to="/">&lt;- Back</router-link>
      <router-link :to="`${$route.path}?yaml`" replace>SHOW YAML</router-link>
      <router-link :to="`${$route.path}/preview`">PREVIEW</router-link>
      <h2>WeekView</h2>

      <div v-for="dindex in 7" :key="`d-${dindex}`">
        <h4>{{formatDate(date, dindex)}}</h4>
        <router-link :to="`/${date}/${dindex}/create-service`" tag="button" class="mv2">+ Добавить службу</router-link>
        <router-link :to="`/${date}/${dindex}/edit-day`" tag="button" class="mv2">+ Инфо</router-link>
        <p v-if="days[date][dindex].description"><b>Description:</b> {{ days[date][dindex].description }}</p>
        <p v-if="days[date][dindex].pagebreak"><b>Pagebreak</b></p>
        <table class="collapse ba br2 b--black-10 pv2 ph3">
          <tr>
            <th class="pa1">Время</th>
            <th class="pa1">Храм</th>
            <th class="pa1">Служба</th>
            <th class="pa1">Священник</th>
            <th class="pa1">Управление</th>
          </tr>
          <tr v-for="(service, sindex) in days[date][dindex].services" :key="`s-${sindex}`">
            <td class="pa1">{{service.time}}</td>
            <td class="pa1">{{service.church}}</td>
            <td class="pa1">{{service.service}}</td>
            <td class="pa1">{{service.priest}}</td>
            <td class="pa1">
              <button class="pa1 pt2" @click="serviceDown(days[date][dindex], sindex)">🔽</button>
              <button class="pa1 pt2" @click="serviceUp(days[date][dindex], sindex)">🔼</button>
              <router-link :to="`/${date}/${dindex}/${sindex}/edit-service`" tag="button" class="pa1 pt2">🖋</router-link>
              <button class="pa1 pt2" @click="deleteService(days[date][dindex], sindex)">🗑</button>
            </td>
          </tr>
        </table>
      </div>
    </div>
    
    
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapState } from 'vuex'
import YamlEdit from '@/components/YamlEdit'

moment.locale('ru')

export default {
  name: 'WeekView',
  props: ['date', 'yaml'],
  data () {
    console.log('router', this.$route)
    return {
      // yaml: this.$route.query.view === 'yaml'
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
      return moment(date, 'YYYY-MM-DD').add(index - 1, 'd').format('dddd, D MMMM, YYYY')
    },
    transformDays (days) {
      /* eslint-disable no-unused-expressions */
      // console.log('step1', _.values(days))
      // console.log('step2', _.omit(days['1'].services[0], ['week', 'day']))
      // console.log('step3', _.map(_.values(days), day => { return day.services }))
      // console.log('step4', _.map(_.values(days), day => { return _.map(day.services, (obj) => { return obj.service }) }))
      // console.log('step5', _.map(_.values(days), day => { return _.map(day.services, (obj) => { return _.omit(obj, ['week', 'day']) }) }))
      console.log(days)
      return _.zipObject([1, 2, 3, 4, 5, 6, 7], _.map(_.values(days), day => {
        return _.map(day.services, (obj) => {
          return _.omit(obj, ['week', 'day'])
        })
      }))
    },
    onYamlSave (obj) {
      console.log(obj)
      this.$store.commit('SET_WEEK', {
        week: obj[1].week,
        weekObj: obj
      })
      this.$router.replace(this.$route.path)
    },
    validate (obj) {
      console.log('validate', obj)
      return 'OK'
    },
    serviceUp (dayObj, sindex) {
      if (sindex === 0) {
        return
      }
      const tmp = dayObj.services[sindex - 1]
      dayObj.services[sindex - 1] = dayObj.services[sindex]
      dayObj.services[sindex] = tmp
      this.$store.commit('SET_DAY', dayObj)
    },
    serviceDown (dayObj, sindex) {
      if (sindex === dayObj.services.length - 1) {
        return
      }
      const tmp = dayObj.services[sindex + 1]
      dayObj.services[sindex + 1] = dayObj.services[sindex]
      dayObj.services[sindex] = tmp
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
    }
  },
  components: {
    yamledit: YamlEdit
  }
}
</script>

<style lang="sass">
// .h-100
//   min-height: 100vh
.yaml-container
  display: flex
  flex-direction: column
  align-items: stretch
  align-self: stretch !important
  flex: 1 1 auto
</style>
