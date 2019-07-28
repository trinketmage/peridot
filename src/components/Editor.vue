<template>
  <!-- <div :id="editorId" style="width: 100%; height: 100%;"></div> -->
  <div class="editor-container">
    <codemirror
      ref="myCm"
      :value="content"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
  </div>
</template>

<script>

import { codemirror } from 'vue-codemirror'
// require styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/placeholder'

// require more codemirror resource...

export default {
  components: {
    codemirror
  },
  props: ['editorId', 'content', 'lang', 'theme', 'errors'],
   data () {
     return {
       cmOptions: {
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          
          placeholder: 'hello world'
       }
     }
   },
   // watch: {
   //   content (value) {
   //   	if (this.beforeContent !== value) {
   //     	this.editor.setValue(value, 1)
   //     }
   //   },
   //   errors (newVal) {
   //     this.editor.getSession().setAnnotations(newVal)
   //   }
   // },
   mounted () {
    // const lang = this.lang || 'text'
    // const theme = this.theme || 'github'
    // this.editor = window.ace.edit(this.editorId)
    // this.editor.setValue(this.content, 1)
    // this.editor.getSession().setMode(`ace/mode/${lang}`)
    // this.editor.setTheme(`ace/theme/${theme}`)
    // this.editor.on('change', () => {
    //   this.beforeContent = this.editor.getValue()
    //   this.$emit('change-content', this.editor.getValue())
    // })
  },
  methods:{

    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.$emit('change-content', newCode)

    }

  }
}
</script>

<style scoped lang="sass">
.editor-container
  /deep/ .CodeMirror
    height: auto
    border: 1px solid #ddd
    border-radius: 3px
    color: rgb(36, 41, 46)
    padding-top: 12px
    padding-bottom: 12px
    .CodeMirror-gutters
      background-color: transparent
      // background-color: red
      color: #959da5
      border-right: none
      padding-left: 7px
      padding-right: 12px
    .CodeMirror-placeholder
      opacity: .3
</style>
