<template>
  <div
    class="peridot"
    :style="{
      transform
    }">
    <svg height="100%" width="100%" viewBox="0 0 200 200">
      <polygon points="50,50 50,150 150,100"/>
    </svg>
  </div>
</template>

<script>
import {vectorToAngle} from '@/pure/trigonometry'

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
  computed: {
    angle() {
      return vectorToAngle(store.robot.direction)
    },
    transform() {
      const {position} = store.robot
      const {angle} = this
      return `translateX(${position.x * 100}%) translateY(${position.y * 100}%) rotate(${angle}deg)`
    }
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Press+Start+2P&display=swap');

.peridot {
  position: absolute;
  // background-color: #E6E200;
  width: 48px;
  height: 48px;
  display: block;
  left: 0px;
  top: 0px;
  // border-radius: 20px;
  transition: transform .3s ease;
}
</style>
