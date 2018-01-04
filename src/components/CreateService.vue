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
          <option v-for="(church, index) of churches" :key="index" :value="church.value">{{church.title}}</option>
        </select>
      </div>
      <div class="mv2">
        <label for="service">Служба</label>
        <input type="text" v-model="newService.service">
      </div>
      <div class="mv2">
        <label for="priest">Священник</label>
        <input type="text" v-model="newService.priest">
      </div>
      <hr>
      <button @click="submit">Добавить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateService',
  data () {
    return {
      newService: {
        time: '7:00',
        church: 'E',
        service: 'Божественная Литургия',
        priest: 'прот. Андрей'
      },
      churches: [
        {value: 'E', title: 'Елисаветинский храм'},
        {value: 'D', title: 'Державный храм'}
      ],
      date: this.$route.params.week,
      day: this.$route.params.day
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