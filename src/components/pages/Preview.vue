<template>
<div class="bg">
  <div class="page">
    <div class="close" @click="$router.push(`/${date}`)">ЗАКРЫТЬ</div>
    <div class="padding">
      <table class="common">
        <col width="70%" valign="top">
        <col width="30%" valign="top">
        <tr><td>
          <table class="left">
            <schedule v-for="day in days[date]" :key="`s-${day.index}`" :day="day"/>
          </table>
        </td><td>
          <table class="right">
            <calendar v-for="day in days[date]" :key="`c-${day.index}`" :day="day"/>
          </table>
        </td></tr>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import ScheduleBody from '@/components/ui/ScheduleBody'
import CalendarBody from '@/components/ui/CalendarBody'

export default {
  name: 'Preview',
  props: ['date'],
  computed: mapState(['days']),
  components: {
    schedule: ScheduleBody,
    calendar: CalendarBody
  }
}
</script>

<style lang="sass">
.bg
  height: 100%
  width: 100%
  background: #f2f2f2
  padding: 20px
.page
  position: relative
  width: 210mm
  height: 297mm
  background: white
  margin: 0 auto
  padding: 10mm
  font: 12px "Roboto Condensed"
.close
  font-size: 14px
  position: fixed
  right: 0
  top: 0
  padding: 12px
  background: yellow
.padding
  // border: 1px solid cyan
  width: 100%
  height: 100%
  margin: 0
  padding: 0
.common
  position: relative
  width: 100%
  border-collapse: collapse
  margin: 0
  padding: 0
  td
    vertical-align: top
    border: none
    margin: 0
    padding: 0
.left
  position: relative
  margin: 0
  width: 100%
  border-collapse: collapse
  text-align: auto
.right
  margin: 0
  width: 100%
  border-collapse: collapse
  td
    border: .25mm solid #ddd
    border-left: none
    padding: 0 4px
    box-sizing: border-box
    overflow: hidden
</style>
