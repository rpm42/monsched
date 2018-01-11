<template>
  <tbody>
    <tr>
      <td>{{ day.description }}</td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'CalendarTBody',
  props: ['day']
}
</script>
