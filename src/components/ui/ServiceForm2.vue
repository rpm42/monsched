<template>
<v-card v-if="context">
  <v-card-title>
    <span class="headline">{{context.title || 'Добавить службу в расписание'}}</span>
  </v-card-title>
  <v-card-text>
    <v-container fluid>
      <v-layout row class="mb-4">
        <v-flex md5 hidden-sm-and-down><v-subheader>Начало службы</v-subheader></v-flex>
        <v-flex md7 xs12><v-select :items="times" v-model="result.time" label="Время" 
          hint="Например: 10:00" persistent-hint combobox clearable bottom/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md5 hidden-sm-and-down><v-subheader>В каком храме</v-subheader></v-flex>
        <v-flex md7 xs12><v-select :items="churches" v-model="result.church" label="Храм" 
          hint="Например: Державный храм" persistent-hint single-line bottom/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md5 hidden-sm-and-down><v-subheader>Богослужение</v-subheader></v-flex>
        <v-flex md7 xs12><v-select :items="services" v-model="result.service" label="Служба" 
          hint="Например: Божественная литургия" persistent-hint combobox bottom/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md5 hidden-sm-and-down><v-subheader>Кто служит</v-subheader></v-flex>
        <v-flex md7 xs12><v-select :items="priests" v-model="result.priest" label="Священник" 
          hint="Например: прот. Андрей" persistent-hint combobox bottom/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md5 hidden-sm-and-down><v-subheader>Разделитель между утренними и вечерними службами</v-subheader></v-flex>
        <v-flex md7 xs12><v-switch label="Добавить разделитель" v-model="divider"/></v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
    <v-btn color="blue darken-1" flat @click.native="submit">Submit</v-btn>
  </v-card-actions>
</v-card>

</template>
<script>
import _ from 'lodash'
import { PRIEST_LIST, CHURCH_LIST, SERVICE_START_LIST, SERVICE_LABELS_LIST } from '@/constants/convent-info'
export default {
  name: 'ServiceForm2',
  props: ['context'],
  data () {
    return {
      result: {
        time: '7:00',
        church: 'Е',
        service: 'Божественная Литургия',
        priest: 'прот. Андрей'
      },
      divider: false,
      churches: CHURCH_LIST,
      priests: PRIEST_LIST,
      times: SERVICE_START_LIST,
      services: SERVICE_LABELS_LIST
    }
  },
  watch: {
    context (context) {
      console.log(context)
      this.divider = false
      if (context && context.service) {
        this.result = {
          ...(_.pick(context.service, ['time', 'church', 'service', 'priest']))
        }
        this.divider = context.service.divider
      }
    }
  },
  methods: {
    submit () {
      let service = { ...this.result }
      if (this.divider) {
        service.divider = true
      }
      this.context.resolve(service)
      this.divider = false
    },
    close () {
      console.log(this.context)
      this.context.reject()
    }

  }
}
</script>
