<template>
  <div class="yaml-edit">
    <div class="toolbar">
      <div><button @click="save()">Save</button></div>
    </div>
    <div class="editor">
      <codemirror v-model="code" :options="editorOptions"/>
    </div>
    <div class="console"></div>
    
  </div>
</template>

<script>
import yaml from 'js-yaml'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/yaml/yaml.js'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/lib/codemirror.css'

export default {
  name: 'YamlEdit',
  props: ['data', 'validate'],
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
      if (this.validate) {
        const status = this.validate(yaml.safeLoad(this.code))
        if (status !== 'OK') {
          return false
        }
      }
      console.log('save1', this.code)
      console.log('save2', yaml.safeLoad(this.code))
      this.$emit('save', yaml.safeLoad(this.code))
    }
  },
  components: {
    codemirror: codemirror
  }
}
</script>

<style lang="sass">
.CodeMirror
  font: 11px 'Menlo'
  text-align: left
  border: 1px solid cyan
  height: auto
  flex: 1 1 auto
.vue-codemirror
  display: flex
  flex-direction: column
  align-items: stretch
  flex: 1 1 auto

.yaml-edit
  display: flex
  flex-direction: column
  align-items: stretch
  flex: 1 1 auto
  .toolbar
    flex: 0 1 24px
    background: #999
  .editor
    flex: 1 1 auto
    display: flex
    flex-direction: column
    align-items: stretch
  .console
    background: black
    border: 1px solid red
    flex: 0 1 32px
    // display: none

</style>
