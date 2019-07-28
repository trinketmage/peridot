<template>
  <div class="home">
    <div class="editor-gabarit">
      <Editor
        editor-id="peridot"
        :content="content"
        theme="monokai"
        :errors="errorBag"
        @change-content="changeContent"/>
    </div>
    <kinder-gartner/>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue"
import KinderGartner from "@/components/KinderGartner.vue"

import scenarios from "@/assets/Scenarios";
import Instructions from '@/pure/Instructions'
import store from '@/store/index'
import cloneDeep from "lodash/fp/cloneDeep";
import { formatScenerioGrid } from "@/pure/ScenarioUtils";

export default {
  name: "home",
  components: {
    Editor,
    KinderGartner
  },
  data () {
    return {
      content: "",
      errorBag: []
    }
  },
  computed: {
    robot() {
      return store.robot
    },
    i18nInstructions() {
      const i18nInstructions = {}
      for(const key in Instructions) {
        if(this.$te(key)) {
          i18nInstructions[this.$t(key)] = Instructions[key]
        }
      }
      return i18nInstructions
    }
  },
  methods: {
    changeContent (value) {
      store.robot = cloneDeep(scenarios[0].robot)
      store.grid = formatScenerioGrid(scenarios[0])

      this.content = value
      this.checkInstructions(value)
    },
    checkInstructions (value) {
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
              this.i18nInstructions[str](store)
            }
          }
      }
      this.errorBag = errors
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
}
.editor-gabarit {
  height: 100%;
  flex: 1;
}
.kinder-gartner {
  flex: 1;
  height: 100%;
}
</style>
