<template>
  <tbody>
    <tr><th colspan=4>{{formatDate(day.week, day.index)}}</th></tr>
    <tr v-for="(service, sindex) in day.services" :key="'s'+sindex" v-save-divider-offset="{day, sindex}">
      <td>{{service.time}}</td>
      <td>{{service.church}}</td>
      <td v-html="service.service"></td>
      <td>{{service.priest}}</td>
    </tr>
  </tbody>
</template>

<script>
import moment from 'moment'
import Vue from 'vue'

moment.locale('ru')

Vue.directive('save-divider-offset', {
  inserted (el, binding, { context }) {
    const day = binding.value.day
    const services = day.services
    const sindex = binding.value.sindex
    if (services[sindex].divider || services.length === sindex - 1) {
      console.log('SET_OFFSET', {dayObj: day, offset: el.offsetTop})
      context.$store.commit('SET_OFFSET', {dayObj: day, offset: el.offsetTop})
    }
  }
})

export default {
  name: 'DayBody',
  props: ['day'],
  created () {
    console.log('day', this.day)
  },
  methods: {
    formatDate (date, day) {
      date = moment(date, 'YYYY-MM-DD').add(day - 1, 'd')
      return `${date.format('dddd — D MMMM')} (${date.subtract(13, 'd').format('D MMMM ст. ст.')})`.toLocaleUpperCase()
    }
  }
}
</script>

<style lang="sass" scoped>
tbody
  td, th
    text-align: auto
    border: .25mm solid #ddd
    padding: 0px 3px
  td
    &:nth-of-type(1)
      text-align: right
      width: 7mm
    &:nth-of-type(2)
      text-align: center
      width: 2.5mm
    &:nth-of-type(3)
      text-align: left
      text-transform: uppercase
    &:nth-of-type(4)
      text-align: left
</style>
