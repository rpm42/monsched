<template>
  <section class="container">
    <div>
      <router-link to="/">&lt;- Back</router-link>
      <hr>
      <h2>Создать седмицу</h2>
      <div>
        <label for="name">Название: </label>
        <input type="text" id="name" v-model="newWeek.name">
      </div>
      <div>
        <label for="date">Седмица: </label>
        <input type="date" id="date" v-model="firstDay">
        <span>(выберите любой день из нужной недели)</span>
        <p>Седмица: {{newWeek.start}} - {{newWeek.end}}</p>
      </div>
      <hr>
      <button @click="submit()">Добавить!</button>
    </div>
  </section>
</template>

<script>

import moment from 'moment'

export default {
  name: 'CreateWeek',
  data () {
    return {
      newWeek: {
        name: '',
        start: '',
        end: ''
      },
      firstDay: ''
    }
  },
  watch: {
    firstDay (val) {
      this.newWeek.start = moment(val).subtract(1, 'd').startOf('week').add(2, 'd').format('YYYY-MM-DD')
      this.newWeek.end = moment(val).subtract(1, 'd').startOf('week').add(8, 'd').format('YYYY-MM-DD')
    }
  },
  methods: {
    submit () {
      this.$store.commit('CREATE_WEEK', this.newWeek)
      this.$router.push('/')
    }
  }
}
</script>