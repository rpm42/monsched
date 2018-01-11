<template>
  <tbody>
    <tr v-for="(service, index) in day.services" :key="`s-${index}`">
      <td>{{ service.time }}</td>
      <td>{{ service.church }}</td>
      <td v-html="service.service"></td>
      <td>{{ service.priest }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'ScheduleTBody',
  props: ['day']
}
</script>
