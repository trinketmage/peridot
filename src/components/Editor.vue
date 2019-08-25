<template>
  <div class="editor-container">
    <codemirror
      ref="editor"
      :value="content"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />
    <div class="editor-footer">
      <a>{{ $t("help") }}</a>
      <div class="sizer">
        <span class="speed-control" @click="nextSpeed">{{speed}} x</span>
        <button @click="submit">
          <svg
            data-v-2a9d965d=""
            height="20px"
            width="20px"
            viewBox="0 0 200 200"
          >
            <polygon data-v-2a9d965d="" points="50,50 50,150 150,100"></polygon>
          </svg>
          {{ $t("run") }}
        </button>
      </div>
      </div>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/display/placeholder";

import "./peridot.css";
import "./peridot.js";

import scenarios from "@/assets/Scenarios/index";
import Instructions from "@/pure/Instructions";
import store from "@/store/index";
import { formatScenerioGrid, formatScenerioRobot } from "@/pure/ScenarioUtils";
import { TimelineMax, TweenMax } from "gsap";
const speeds = [
  1,
  1.5,
  2,
  .5
]

export default {
  components: {
    codemirror
  },
  data() {
    return {
      content: "",
      errorBag: [],
      currentSpeedIdx: 0,
      cmOptions: {
        tabSize: 4,
        mode: "peridot",
        theme: "peridot",
        lineNumbers: true,
        placeholder: this.$t("placeholder")
      },
      instructions: []
    };
  },
  computed: {
    speed() {
      return speeds[this.currentSpeedIdx]
    },
    robot() {
      return store.robot;
    },
    i18nInstructions() {
      const i18nInstructions = {};
      for (const key in Instructions) {
        if (this.$te(`instructions.${key}`)) {
          i18nInstructions[this.$t(`instructions.${key}`)] = Instructions[key];
        }
      }
      return i18nInstructions;
    }
  },
  created() {
    this.errorWidgets = []
  },
  mounted() {
    this.resetPeridot()
  },
  methods: {
    nextSpeed() {
      if(this.currentSpeedIdx < speeds.length - 1) {
        this.currentSpeedIdx ++
      } else {
        this.currentSpeedIdx = 0
      }
    },
    onCmReady() {
      // console.log('the editor is readied!', cm)
    },
    onCmFocus() {
      // console.log('the editor is focus!', cm)
    },
    onCmCodeChange(newCode) {
      // console.log('this is new code', newCode)
      this.changeContent(newCode);
    },
    changeContent(value) {
      this.content = value;
      // if (this.tl) this.tl.kill();
      // this.instructions = [];
      // store.robot = formatScenerioRobot(scenarios[store.scenarioIdx].robot);
      // store.grid = formatScenerioGrid(scenarios[store.scenarioIdx]);
      // this.checkInstructions()
    },
    submit() {
      if (this.tl) this.tl.kill();
      this.instructions = [];
      store.robot = formatScenerioRobot(scenarios[store.scenarioIdx].robot);
      store.grid = formatScenerioGrid(scenarios[store.scenarioIdx]);
      this.changeContent(this.content);
      this.checkInstructions();
      this.playInstructions();
    },
    checkInstructions() {
      const inputs = this.content.split("\n");
      const errors = [];
      for (let i = 0; i < inputs.length; i++) {
        const str = inputs[i].replace(/\s/g, "");
        if (str) {
          if (Object.keys(this.i18nInstructions).indexOf(str) === -1) {
            const error = {
              row: i,
              column: 0,
              text: `L'instruction ligne ${i + 1} est erronée`,
              type: "error"
            };
            errors.push(error);
            this.instructions.push(error);
            break;
          } else {
            // this.i18nInstructions[str]({
            //   robot: store.robot,
            //   grid: store.grid
            // })
            this.instructions.push({
              type: "instruction",
              key: str,
              line: i
            });
          }
        }
      }
      this.errorBag = errors;
    },
    displayError(e, line) {
      var element = document.createElement('div');
      element.classList.add('error-line-widget')
      element.innerHTML = `<div class="caption">${e}</div>`
      this.errorWidgets.push(this.$refs.editor.codemirror.addLineWidget( line, element))
    },
    resetPeridot() {
      const {angle, position} = store.robot
      TweenMax.set(store.peridot, {x: `${position.x * 100}%`, y: `${position.y * 100}%`, rotation: angle})
    },
    updatePeridot() {
      const {angle, position} = store.robot
      TweenMax.to(store.peridot, store.stepTime / this.speed * 0.5, {x: `${position.x * 100}%`, y: `${position.y * 100}%`, rotation: angle})
    },
    playInstructions() {
      this.resetPeridot()
      this.errorWidgets.forEach(_ => {
        this.$refs.editor.codemirror.removeLineWidget(_)
        _ = null
      })
      this.errorWidgets = []
      if (this.tl) this.tl.kill();
      this.tl = new TimelineMax();
      const helper = {
        progress: 0
      };
      this.instructions.forEach((_, i) => {
        if (_.type === "instruction") {
          this.tl.to(helper, store.stepTime / this.speed, {
            progress: i + 1,
            onComplete: () => {
              try {
                this.i18nInstructions[_.key]({
                  robot: store.robot,
                  grid: store.grid
                });
                this.updatePeridot()
              }
              catch(e) {
                this.displayError(this.$t(`errors.${e.message}`), _.line)
                this.tl.kill()
              }
            }
          });
        }
      });
    }
  }
};
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
    .error-line-widget
        background-color: #fdeeee
        color: #eb5656
        .caption
          padding-left: 6px
          padding-top: 6px
          padding-bottom: 6px
.editor-footer
  color: #6772e4
  background-color: #f6f9fc
  line-height: 30px
  font-size: 13px
  padding-left: 10px
  border-radius: 0 4px 0 4px
  display: flex
  justify-content: space-between
  .speed-control
    margin-right: 10px
    background-color: rgba(255, 255, 255, 1)
    border-radius: 4px
    display: inline-block
    line-height: 1em
    padding: 4px 8px
    cursor: pointer
    user-select: none
    border: 1px solid #6772e4
    &:hover
      color: rgba(255, 255, 255, 1)
      background-color: #6772e4


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
