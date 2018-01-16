<template>
<tbody>
  <tr v-height="day.__height"><td v-html="day.description"></td></tr>
</tbody>
</template>

<script>
import Vue from 'vue'

Vue.directive('height', {
  inserted (el, binding, { context }) {
    if (binding.value) {
      console.log('height inserted', binding.value)
      el.style.height = binding.value + 'px'
    }
  }
})

export default {
  name: 'CalendarBody',
  props: ['day']
}
</script>

<style>

</style>
