<template>
  <div id="app" class="sans-serif">
    <div class="mw9 center ph3-ns bg-moon-gray">
      <div class="cf ph2-ns">
          <div class="fl w-third pa2 bg-moon-gray"><week-list/></div>
          <div class="fl w-two-thirds pa2 bg-light-gray"><router-view/></div>
      </div>
    </div>
  </div>
</template>

<script>
import WeekList from '@/components/WeekList'

export default {
  name: 'app',
  components: {
    'week-list': WeekList
  }
}
</script>

<style lang="sass">
html
  // font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  font-size: 16px
  word-spacing: 1px
  -ms-text-size-adjust: 100%
  -webkit-text-size-adjust: 100%
  -moz-osx-font-smoothing: grayscale
  -webkit-font-smoothing: antialiased
  box-sizing: border-box

// *, *:before, *:after
//   box-sizing: border-box
//   margin: 0

.container
  min-height: 100vh
  display: flex
  justify-content: left
  align-items: left
  text-align: left
</style>
