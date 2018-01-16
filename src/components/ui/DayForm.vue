<template>
<v-card v-if="context">
  <v-card-title>
    <span class="headline">{{'Редактировать день'}}</span>
  </v-card-title>
  <v-card-text>
    <v-container fluid>
      <v-layout row class="mb-4">
        <v-flex md3 hidden-sm-and-down><v-subheader>Святые дня</v-subheader></v-flex>
        <v-flex md9 xs12><v-text-field v-model="result.description" label="Описание" textarea/></v-flex>
      </v-layout>
      <v-layout row class="mb-4">
        <v-flex md3 hidden-sm-and-down><v-subheader>Начать с новой страницы</v-subheader></v-flex>
        <v-flex md9 xs12><v-switch label="Добавить разделитель" v-model="result.pagebreak"/></v-flex>
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
import marked from 'marked'
import TurndownService from 'turndown'

import _ from 'lodash'
export default {
  name: 'DayForm',
  props: ['context'],
  data () {
    return {
      result: {
        description: '',
        pagebreak: false
      }
    }
  },
  watch: {
    context (context) {
      console.log(context)
      if (context && context.dayObj) {
        let turndownService = new TurndownService()
        let result = { ...(_.pick(context.dayObj, ['description', 'pagebreak'])) }
        result.description = turndownService.turndown(result.description)
        this.result = result
      } else {
        this.result = {
          description: '',
          pagebreak: false
        }
      }
    }
  },
  methods: {
    submit () {
      let result = { ...this.result }
      result.description = marked(result.description)
      console.log(result.description)
      this.context.resolve(result)
    },
    close () {
      console.log(this.context)
      this.context.reject()
    }

  }
}
</script>
