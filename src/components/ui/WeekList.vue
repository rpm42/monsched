<template>
<v-navigation-drawer permanent app>
  <v-dialog v-model="weekFormDialog" persistent max-width="600px">
    <week-from :context="weekFormContext"/>
  </v-dialog>
  <v-toolbar flat dark dense>
    <v-toolbar-title>СЕДМИЦЫ</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn flat color="green" @click="createWeek"><v-icon small>mdi-plus</v-icon> ADD</v-btn>
  </v-toolbar>
  <v-list dark two-line>
    <template v-for="(week, index) in weeks">
      <v-divider v-if="index > 0"/>
      <v-list-tile :key="week.start" @click="$router.push(`/${week.start}`)">
        <v-list-tile-content>
          <v-list-tile-title>{{week.name}}</v-list-tile-title>
          <v-list-tile-sub-title>({{week.start}} - {{week.end}})</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</v-navigation-drawer>
</template>

<script>
import WeekForm from '@/components/ui/WeekForm'
import { mapState } from 'vuex'
export default {
  name: 'WeekList',
  data () {
    return {
      weekFormDialog: false,
      weekFormContext: null
    }
  },
  computed: mapState({
    weeks: state => state.weeks
  }),
  components: {
    'week-from': WeekForm
  },
  methods: {
    createWeek () {
      new Promise((resolve, reject) => {
        this.weekFormContext = {
          resolve, reject
        }
        this.weekFormDialog = true
      }).then((week) => {
        this.$store.commit('CREATE_WEEK', week)
        this.weekFormDialog = false
        this.weekFormContext = null
      }).catch(() => {
        this.weekFormDialog = false
        this.weekFormContext = null
      })
    }
  }
}
</script>

<style>

</style>
