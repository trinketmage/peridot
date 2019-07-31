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
import 'codemirror/addon/mode/simple'
import 'codemirror/mode/javascript/javascript'

import './peridot.css'


/* Example definition of a simple mode that understands a subset of
 * JavaScript:
 */

cm.defineSimpleMode("simplemode", {
  // The start state contains the rules that are intially used
  start: [
    {regex: /avance\b/, token: "move"},
    {regex: /gauche\b/, token: "left"},
    {regex: /prend_un_jeton\b/, token: "picktoken"},
    {regex: /pose_un_jeton\b/, token: "droptoken"},
    {regex: /\bfin\b/, token: "end"},
    {regex: /[0-9]+/i, token: "number"},
    // The regex matches the token, the token property contains the type
    {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string"},
    // You can match multiple tokens at once. Note that the captured
    // groups must span the whole string in this case
    {regex: /(function)(\s+)([a-z$][\w$]*)/,
     token: ["keyword", null, "variable-2"]},
    // Rules are matched in the order in which they appear, so there is
    // no ambiguity between this one and the one above
    {regex: /(?:définir|si|sinon_si|sinon|tant_que)\b/,
     token: "structure"},
    {regex: /(répéter\s+)([0-9]*\s+)(fois\s*[:]\s*)/,
      token: ["structure", "number", "structure"],
      indent:true,
      next:"repeat"},
    {regex: /(!)?(mur_en_face|mur_a_gauche|mur_a_droite|sur_un_jeton|a_des_jetons|regarde_nord|regarde_sud|regarde_ouest|regarde_est)/,
      token: "condition"},
    {regex: /\/\/.*/, token: "comment"},
    // A next property will cause the mode to move to a different state
    {regex: /\/\*/, token: "comment", next: "comment"},
  ],
  // The multi-line comment state.
  comment: [
    {regex: /.*?\*\//, token: "comment", next: "start"},
    {regex: /.*/, token: "comment"}
  ],
  repeat:[
    {regex: /avance\b/, token: "move"},
    {regex: /gauche\b/, token: "left"},
    {regex: /prend_un_jeton\b/, token: "picktoken"},
    {regex: /pose_un_jeton\b/, token: "droptoken"},

   {regex: /(répéter\s+)([0-9]*\s+)(fois\s*[:]\s*)/,
     token: ["structure", "number", "structure"],
     indent:true,
     next:"repeat"},
      {regex: /:fin_répéter\b/, token:"structure", dedent:true, pop:true}
  ],

  // The meta property contains global information about the mode. It
  // can contain properties like lineComment, which are supported by
  // all modes, and also directives like dontIndentStates, which are
  // specific to simple modes.
  meta: {
    dontIndentStates: ["comment"],
    lineComment: "//"
  }
});

export default {
  components: {
    codemirror
  },
  props: ['editorId', 'content', 'lang', 'theme', 'errors'],
  data () {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'simplemode',
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
