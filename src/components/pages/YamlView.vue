<template>
<v-container fluid class="ma-0 pa-0">
  <yaml-edit :data="days[date]" @save="onsave" @close="$router.push(`/${date}`)"/>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
import YamlEdit from '@/components/ui/YamlEdit'
export default {
  name: 'YamlView',
  props: ['date'],
  data () {
    return {}
  },
  computed: mapState(['days']),
  methods: {
    onsave (weekObj) {
      this.$store.commit('SET_WEEK', {
        week: this.date,
        weekObj
      })
      this.$router.push(`/${this.date}`)
    }
  },
  components: {
    'yaml-edit': YamlEdit
  }
}
</script>