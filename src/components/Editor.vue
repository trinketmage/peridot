<template>
  <div class="editor-container">
    <codemirror
      ref="myCm"
      :value="content"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
    <div class="editor-footer">
      <a>{{ $t('help') }}</a>
      <button @click="submit"><svg data-v-2a9d965d="" height="20px" width="20px" viewBox="0 0 200 200"><polygon data-v-2a9d965d="" points="50,50 50,150 150,100"></polygon></svg> {{ $t('run') }}</button>
    </div>
  </div>
</template>

<script>

import { codemirror } from 'vue-codemirror'
import  cm  from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/placeholder'

import './peridot.css'
import './peridot.js'

export default {
  components: {
    codemirror
  },
  props: ['editorId', 'content', 'lang', 'theme', 'errors'],
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'peridot',
        theme: 'peridot',
        lineNumbers: true,

        placeholder: this.$t('placeholder')
      }
    }
  },
  methods:{
    onCmReady(cm) {
      // console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.$emit('change-content', newCode)
    },
    submit() {
      this.$emit('submit', this.content)
    }
  }
}
</script>

<style scoped lang="sass">
.editor-container
  box-shadow: 0 2px 4px 0 rgba(50,50,93,.1)
  border-radius: 4px
  background-color: #ffffff
  /deep/ .CodeMirror
    height: auto
    line-height: 1.5
    padding-bottom: 12px
    padding-top: 12px
    color: rgb(36, 41, 46)
    border-radius: 4px
    .CodeMirror-gutters
      background-color: transparent
      color: #959da5
      border-right: none
      padding-left: 7px
      padding-right: 12px
    .CodeMirror-placeholder
      opacity: .3
.editor-footer
  color: #6772e4
  background-color: #f6f9fc
  line-height: 30px
  font-size: 13px
  padding-left: 10px
  border-radius: 0 4px 0 4px
  button
    height: 30px
    background: #12b47d
    border-color: transparent !important
    color: #fff!important
    text-shadow: 0 1px 0 transparent !important
    box-shadow: none
    border: none
    outline: none
    float: right
    border-radius: 0 0 4px 0
    font-weight: bold
    font-size: 13px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    polygon
      fill: #ffffff

</style>
