<template>
  <div class="absolute top-0 left-0 z-4 vh-100 w-100 bg-moon-gray">
    <div class="close">
      <router-link :to="`/${date}`">X</router-link>
    </div>
    <div class="page center bg-white ma2 debug-grid-16-solid">
      <h1>Preview</h1>
      <div class="flex flex-row items-stretch">
        <table class="w-70 bg-green">
          <schedule-tbody v-for="day in days[date]" :key="day.index" :day="day"/>
        </table>
        <table class="w-30 bg-yellow">
          <calendar-tbody v-for="day in days[date]" :key="day.index" :day="day"/>
        </table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ScheduleTBody from './ScheduleTBody'
import CalendarTBody from './CalendarTBody'

export default {
  name: 'Preview',
  props: ['date'],
  computed: mapState(['days']),
  components: {
    'schedule-tbody': ScheduleTBody,
    'calendar-tbody': CalendarTBody
  }
}
</script>

<style lang="sass" scoded>
.page
  max-width: 210mm
  min-width: 210mm
  max-height: 297mm
  min-width: 210mm
  padding: 1cm
  box-model: border-box
.close
  position: absolute
  top: 0
  right: 0
  width: 32px
  height: 32px
  text-align: center
  line-height: 32px
</style>

