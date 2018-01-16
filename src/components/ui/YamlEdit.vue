<template>
<v-card class="pa-0">
  <v-toolbar dense app>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat color="red darken-4" @click="$emit('close')">CLOSE</v-btn>
      <v-btn flat color="green" @click="save()">SAVE</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-card-text class="pa-0">
    <codemirror v-model="code" :options="editorOptions"/>
  </v-card-text>
</v-card>
</template>

<script>
import yaml from 'js-yaml'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/yaml/yaml.js'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/lib/codemirror.css'

export default {
  name: 'YamlEdit',
  props: ['data'],
  data () {
    return {
      editorOptions: {
        tabSize: 2,
        mode: 'text/yaml',
        lineNumbers: true,
        theme: 'base16-dark',
        lineWrapping: true,
        showCursorWhenSelecting: true
      },
      code: ''
    }
  },
  mounted () {
    this.code = yaml.safeDump(this.data)
  },
  methods: {
    save () {
      const result = yaml.safeLoad(this.code)
      if (this.validate) {
        const status = this.validate(result)
        if (status !== 'OK') {
          return false
        }
      }
      console.log('save1', this.code)
      console.log('save2', result)
      this.$emit('save', result)
    }
  },
  components: {
    codemirror: codemirror
  }
}
</script>

<style lang="sass">
.CodeMirror
  font: 14px 'Menlo'
  text-align: left
  height: auto
  z-index: 0

</style>
