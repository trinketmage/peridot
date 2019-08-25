<template>
  <div
    class="peridot"
  >
    <svg height="100%" width="100%" viewBox="0 0 200 200">
      <polygon points="50,50 50,150 150,100"/>
    </svg>
  </div>
</template>

<script>
import {vectorToAngle} from '@trinketmage/sword'
import store from '@/store/index'
export default {
  props:
  {
    position: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    direction: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 1
        }
      }
    }
  },
  mounted() {
    store.peridot = this.$el
  }
}
</script>

<style scoped lang="scss">

.peridot {
  position: absolute;
  width: 48px;
  height: 48px;
  display: block;
  left: 2px;
  top: 2px;
  polygon {
    fill: #24b47e;
    stroke: rgb(185, 244, 188);
  }
}
</style>
