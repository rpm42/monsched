<template>
  <div class="container">
    <div>
      <h2>Редактировать день</h2>
      <div class="mv2">
        <p>Дата: {{ fomattedDate }}</p>
      </div>
      <div class="mv2">
        <label for="service">Описание</label>
        <input type="text" v-model="description">
      </div>
      <div class="mv2">
        <label for="pagebreak">С новой страницы</label>
        <input type="checkbox" v-model="pagebreak">
      </div>
      <hr>
      <button @click="submit">Сохранить</button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'EditDay',
  props: ['date', 'day'],
  data () {
    return {
      fomattedDate: '',
      description: '',
      pagebreak: false
    }
  },
  computed: mapState(['days']),
  mounted () {
    this.dayObj = this.days[this.date][this.day]
    this.fomattedDate = moment(this.dayObj.week, 'YYYY-MM-DD').add(this.dayObj.index - 1, 'd').format('dddd, D MMMM, YYYY')
    this.description = this.dayObj.description + ''
    Vue.set(this, 'pagebreak', this.dayObj.pagebreak)
  },
  methods: {
    submit () {
      this.$store.commit('SET_DAY', {
        ...this.dayObj,
        description: this.description,
        pagebreak: this.pagebreak
      })
      this.$router.push(`/${this.date}`)
    }
  }
}
</script>