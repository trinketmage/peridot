<template>
  <div class="cell-sizer" v-if="data">
    {{data.tokens}}
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped lang="scss">
.cell-sizer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}
</style>
