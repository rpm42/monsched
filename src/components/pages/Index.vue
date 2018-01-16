<template>
<v-app dark>
  <week-list/>
  <v-content>
    <v-layout>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-layout>
  </v-content>
  <v-footer color="blue-grey darken-3" app>
    <span class="white--text">&nbsp; &copy; Свято-Елисаветинский монастырь, 2018</span>
  </v-footer>
</v-app>
</template>

<script>
import WeekList from '@/components/ui/WeekList'
export default {
  name: 'Index',
  components: {
    'week-list': WeekList
  }
}
</script>

<style lang="sass">
</style>