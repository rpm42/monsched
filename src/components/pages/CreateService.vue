<template>
<service-form @submit="onsubmit" @close="$emit('close')" service="false"/>
</template>
<script>
import ServiceForm from '@/components/ui/ServiceForm'
export default {
  name: 'CreateService',
  props: ['date', 'day'],
  data () {
    return {}
  },
  methods: {
    onsubmit (service) {
      console.log('service', service)
      this.$store.commit('ADD_SERVICE', {
        week: this.date,
        day: this.day,
        service: service
      })
      this.$router.push(`/${this.date}`)
    }
  },
  components: {
    'service-form': ServiceForm
  }
}
</script>
