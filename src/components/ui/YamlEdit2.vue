<template>
<v-card>
  <v-toolbar card dense>
    <v-toolbar-items>
      <v-btn flat color="green" @click="save()">SAVE</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <v-card-text>
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
  props: ['context'],
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
  watch: {
    context (context) {
      if (context) {
        this.code = yaml.safeDump(context.data)
        codemirror.methods.refrash()
      }
    }
  },
  methods: {
    save () {
      const result = yaml.safeLoad(this.code)
      if (this.context.validate) {
        const status = this.validate(result)
        if (status !== 'OK') {
          this.context.reject(status)
        }
      }
      console.log('save1', this.code)
      console.log('save2', result)
      this.context.resolve(result)
    },
    close () {
      this.context.reject(null)
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
  border: 1px solid cyan
  height: auto

</style>
