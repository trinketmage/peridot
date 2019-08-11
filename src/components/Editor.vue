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

import scenarios from "@/assets/Scenarios";
import Instructions from '@/pure/Instructions'
import store from '@/store/index'
import { formatScenerioGrid,formatScenerioRobot } from "@/pure/ScenarioUtils";

export default {
  components: {
    codemirror
  },
  data () {
    return {
      content: '',
      errorBag: [],
      cmOptions: {
        tabSize: 4,
        mode: 'peridot',
        theme: 'peridot',
        lineNumbers: true,
        placeholder: this.$t('placeholder')
      }
    }
  },
  // created() {
  //   this.changeContent()
  // },
  computed: {
    robot() {
      return store.robot
    },
    i18nInstructions() {
      const i18nInstructions = {}
      for(const key in Instructions) {
        if(this.$te(`instructions.${key}`)) {
          i18nInstructions[this.$t(`instructions.${key}`)] = Instructions[key]
        }
      }
      return i18nInstructions
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
      this.changeContent(newCode)
    },
    changeContent (value) {
      store.robot = formatScenerioRobot(scenarios[store.scenarioIdx].robot)
      store.grid = formatScenerioGrid(scenarios[store.scenarioIdx])
      this.content = value
      this.checkInstructions()
    },
    submit(value, e) {
      console.log("submit")
      // this.changeContent(this.content)
      // this.checkInstructions()
    },
    checkInstructions () {
      const inputs = this.content.split('\n')
      const errors = []
      for (let i = 0; i < inputs.length; i++) {
        const str = inputs[i].replace(/\s/g, '')
        if (str) {
          if (Object.keys(this.i18nInstructions).indexOf(str) === -1) {
            errors.push({
                row: i,
                column: 0,
                text: `L'instruction ligne ${i + 1} est erronée`,
                type: "error"
            })
            break;
          } else {
            this.i18nInstructions[str]({
              robot: store.robot,
              grid: store.grid
            })
          }
        }
      }
      this.errorBag = errors
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
