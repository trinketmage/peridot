<template>
  <div class="wall" :style="style">
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    style() {
      return {
      }
    }
  }
}
</script>

<style scoped lang="scss">
.wall {
  position: absolute;
  border-top: 1px solid red;
  border-right: 1px solid red;
  box-sizing: content-box;
}
</style>
