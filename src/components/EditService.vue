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
      <div class="mv2">
        <label for="divider">Разделитель</label>
        <input type="checkbox" v-model="divider">
      </div>
      <hr>
      <button @click="submit">Сохранить</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { PRIEST_LIST, CHURCH_LIST } from '@/constants/convent-info'

export default {
  name: 'EditService',
  props: ['date', 'day', 'sindex'],
  data () {
    return {
      newService: {
        time: '',
        church: '',
        service: '',
        priest: ''
      },
      divider: false,
      churches: CHURCH_LIST,
      priests: PRIEST_LIST
    }
  },
  computed: mapState(['days']),
  mounted () {
    const srv = this.days[this.date][this.day].services[this.sindex]
    if (srv.divider) {
      this.divider = true
    }
    this.newService = {
      ..._.omit(srv, ['divider'])
    }
  },
  methods: {
    submit () {
      let dayObj = { ...this.days[this.date][this.day] }
      if (this.divider) {
        this.newService.divider = true
      }
      dayObj.services[this.sindex] = this.newService
      this.$store.commit('SET_DAY', dayObj)
      this.$router.push(`/${this.date}`)
    }
  }
}
</script>