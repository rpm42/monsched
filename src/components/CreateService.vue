<template>
  <div class="container">
    <div>
      <h2>Добавить службу</h2>
      <div class="mv2">
        <label for="time">Время</label>
        <input type="text" v-model="newService.time">
      </div>
      <div class="mv2">
        <label for="church">Время</label>
        <select name="church" v-model="newService.church" id="church">
          <option v-for="(church, index) of churches" :key="index" :value="church.id">{{church.title}}</option>
        </select>
      </div>
      <div class="mv2">
        <label for="service">Служба</label>
        <input type="text" v-model="newService.service">
      </div>
      <div class="mv2">
        <label for="priest">Священник</label>
        <select name="priest" v-model="newService.priest" id="church">
          <option v-for="(priest, index) of priests" :key="index" :value="priest">{{priest}}</option>
        </select>
      </div>
      <hr>
      <button @click="submit">Добавить</button>
    </div>
  </div>
</template>

<script>
import { PRIEST_LIST, CHURCH_LIST } from '@/constants/convent-info'

export default {
  name: 'CreateService',
  props: ['date', 'day'],
  data () {
    return {
      newService: {
        time: '7:00',
        church: 'Е',
        service: 'Божественная Литургия',
        priest: 'прот. Андрей'
      },
      churches: CHURCH_LIST,
      priests: PRIEST_LIST
    }
  },
  methods: {
    submit () {
      this.$store.commit('ADD_SERVICE', {
        week: this.date,
        day: this.day,
        ...this.newService
      })
      this.$router.push(`/${this.date}`)
    }
  }
}
</script>