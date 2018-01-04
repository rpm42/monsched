<template>
  <section class="container">
    <div>
      <router-link to="/">&lt;- Back</router-link>
      <h2>WeekView</h2>

      <div v-for="(weekDay, dindex) in weekDays" :key="`d-${dindex}`">
        <h4>{{formatDate(date, dindex)}}</h4>
        <router-link :to="`/${date}/${dindex+1}/create-service`" tag="button" class="mv2">+ Добавить службу</router-link>
        <router-link :to="`/${date}/${dindex+1}/create-service`" tag="button" class="mv2">+ Инфо</router-link>
        <table class="collapse ba br2 b--black-10 pv2 ph3">
          <tr>
            <th class="pa1">Время</th>
            <th class="pa1">Храм</th>
            <th class="pa1">Служба</th>
            <th class="pa1">Священник</th>
          </tr>
          <tr v-for="(service, sindex) in days[date][dindex+1].services" :key="`s-${sindex}`">
            <td class="pa1">{{service.time}}</td>
            <td class="pa1">{{service.church}}</td>
            <td class="pa1">{{service.service}}</td>
            <td class="pa1">{{service.priest}}</td>
          </tr>
        </table>
      </div>
    </div>
    
    
  </section>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

moment.locale('ru')

export default {
  name: 'WeekView',
  data () {
    console.log('data', this)
    return {
      date: this.$route.params.week,
      weekDays: [
        'Понедельник', 'Вторник', 'Среда',
        'Четверг', 'Пятница', 'Суббота', 'Воскрсенье'
      ]
    }
  },
  watch: {
    '$route' (to, from) {
      this.date = to.params.week
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
      return moment(date, 'YYYY-MM-DD').add(index - 1, 'd').format('dddd, DDD MMMM, YYYY')
    }
  }
}
</script>