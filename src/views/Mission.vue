<template>
  <div class="home">
    <kinder-gartner/>
    <div class="editor-gabarit">
      <Editor/>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import scenarios from "@/assets/Scenarios";

import Editor from "@/components/Editor.vue"
import KinderGartner from "@/components/KinderGartner.vue"
import { formatScenerioGrid, formatScenerioRobot } from "@/pure/ScenarioUtils";

export default {
  name: "mission",
  components: {
    Editor,
    KinderGartner
  },
  data() {
    const idx = parseInt(this.$route.params.slug) - 1
    store.scenarioIdx = idx
    store.robot = formatScenerioRobot(scenarios[idx].robot)
    store.grid = formatScenerioGrid(scenarios[idx])
    return {
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
  flex: 2;
  padding: 24px;
	overflow: auto;
}
.kinder-gartner {
  flex: 3;
  height: 100%;
}
</style>
