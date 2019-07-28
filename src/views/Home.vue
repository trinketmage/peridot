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
    <kinder-gartner :robot="robot"/>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue"
import KinderGartner from "@/components/KinderGartner.vue"

import Instructions from '@/pure/Instructions'

export default {
  name: "home",
  components: {
    Editor,
    KinderGartner
  },
  data () {
    return {
      content: "",
      errorBag: [],
      keys: Object.keys(Instructions),
      robot: {
        compartment: {
          capacity: 10,
          hold: 0
        },
        position: {
          x: 0,
          y: 0
        },
        direction: {
          x: 0,
          y: 1
        }
      }
    }
  },
  methods: {
    changeContent (value) {
      this.robot = {
        position: {
          x: 0,
          y: 0
        },
        direction: {
          x: 0,
          y: 1
        }
      }
      this.content = value
      this.checkInstructions(value)
    },
    checkInstructions (value) {
      const inputs = this.content.split('\n')
      const errors = []
      for (let i = 0; i < inputs.length; i++) {
        const str = inputs[i].replace(/\s/g, '')
          if (str) {
            if (this.keys.indexOf(str) === -1) {
              errors.push({
                  row: i,
                  column: 0,
                  text: `L'instruction ligne ${i + 1} est erronée`,
                  type: "error"
              })
              break;
            } else {
              Instructions[str](this)
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
