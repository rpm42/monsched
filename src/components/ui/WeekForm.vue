<template>
<v-card v-if="context">
  <v-card-title>
    <span class="headline">{{'Добавить седмицу'}}</span>
  </v-card-title>
  <v-card-text>
    <v-container fluid>
      <v-layout row class="mb-4">
        <v-flex md3 hidden-sm-and-down><v-subheader>Название седмицы</v-subheader></v-flex>
        <v-flex md9 xs12><v-text-field v-model="name" label="Название"/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md3 hidden-sm-and-down><v-subheader>Выберете любой день</v-subheader></v-flex>
        <v-flex md9 xs12>
          <v-menu lazy :close-on-content-click="false" v-model="menu"
            transition="scale-transition" offset-y full-width :nudge-right="40"
            max-width="290px" min-width="290px" >
            <v-text-field slot="activator" label="Выбор недели"
              hint="Выберите любой день из нужной недели" persistent-hint prepend-icon="event" 
              :value="getValue(date)" readonly></v-text-field>
            <v-date-picker v-model="date" no-title scrollable actions first-day-of-week="1">
              <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="cancel">Закрыть</v-btn>
                  <v-btn flat color="primary" @click="save">OK</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="close">Закрыть</v-btn>
    <v-btn color="blue darken-1" flat @click.native="submit">Сохранить</v-btn>
  </v-card-actions>
</v-card>

</template>
<script>
// import _ from 'lodash'
import moment from 'moment'
export default {
  name: 'DayForm',
  props: ['context'],
  data () {
    return {
      name: '',
      date: '',
      menu: false
    }
  },
  watch: {
    context (context) {
      console.log(context)
      if (context && context.week) {
        this.name = context.week.name
        this.date = context.week.start
      }
    }
  },
  methods: {
    submit () {
      const start = moment(this.date).startOf('week').format('YYYY-MM-DD')
      const end = moment(this.date).startOf('week').add(6, 'd').format('YYYY-MM-DD')
      this.context.resolve({
        name: this.name,
        start,
        end
      })
    },
    close () {
      this.context.reject()
    },
    getValue (val) {
      if (val) {
        const start = moment(val).startOf('week').format('D MMM YYYY')
        const end = moment(val).startOf('week').add(6, 'd').format('D MMM YYYY')
        return `${start} — ${end}`
      }
      return ''
    }
  }
}
</script>
