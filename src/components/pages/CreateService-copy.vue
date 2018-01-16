<template>
<v-container fluid>
  <v-layout row class="mb-4">
    <v-flex md5 hidden-sm-and-down><v-subheader>Начало службы</v-subheader></v-flex>
    <v-flex md7 xs12><v-select :items="times" v-model="newService.time" label="Время" 
      hint="Например: 10:00" persistent-hint combobox bottom/></v-flex>
  </v-layout>
  <v-layout row class="mb-4">
    <v-flex md5 hidden-sm-and-down><v-subheader>В каком храме</v-subheader></v-flex>
    <v-flex md7 xs12><v-select :items="churches" v-model="newService.church" label="Храм" 
      hint="Например: Державный храм" persistent-hint single-line bottom/></v-flex>
  </v-layout>
  <v-layout row class="mb-4">
    <v-flex md5 hidden-sm-and-down><v-subheader>Богослужение</v-subheader></v-flex>
    <v-flex md7 xs12><v-select :items="services" v-model="newService.service" label="Служба" 
      hint="Например: Божественная литургия" persistent-hint combobox bottom/></v-flex>
  </v-layout>
  <v-layout row class="mb-4">
    <v-flex md5 hidden-sm-and-down><v-subheader>Кто служит</v-subheader></v-flex>
    <v-flex md7 xs12><v-select :items="priests" v-model="newService.priest" label="Священник" 
      hint="Например: прот. Андрей" persistent-hint combobox bottom/></v-flex>
  </v-layout>
  <v-layout row class="mb-4">
    <v-flex md5 hidden-sm-and-down><v-subheader>Разделитель между утренними и вечерними службами</v-subheader></v-flex>
    <v-flex md7 xs12><v-switch label="Добавить разделитель" v-model="divider"/></v-flex>
  </v-layout>
  <v-layout row justify-end class="mb-4">
    <v-flex offset-md5 md7 xs12><v-btn color="primary" @click="submit" class="ma-0">Добавить</v-btn></v-flex>
  </v-layout>
</v-container>
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
      divider: false,
      churches: CHURCH_LIST,
      priests: PRIEST_LIST,
      times: [
        '4:00',
        '5:40',
        '6:40',
        '7:00',
        '7:40',
        '8:00',
        '9:00',
        '10:00',
        '17:30',
        '17:45',
        '18:00'
      ],
      services: [
        'Божественная литургия',
        'Полунощница',
        'Полунощница. Утреня',
        '3-ий, 6-ой час',
        '1-ый час, 3-ий, 6-ой час',
        'Исповедь',
        '9-ый час',
        'Вечерня. Утреня. 1-ый час',
        'Вечерня. Утреня (полиелей). 1-ый час.',
        'Беседа прот. Андрея Лемешонка с прихожанами'
      ]
    }
  },
  methods: {
    submit () {
      if (this.divider) {
        this.newService.divider = true
      }
      this.$store.commit('ADD_SERVICE', {
        week: this.date,
        day: this.day,
        service: this.newService
      })
      this.$router.push(`/${this.date}`)
    }
  }
}
</script>
