<template>
  <div class="cell-sizer" v-if="data && data.tokens > 0">
    {{data.tokens}}
    <div class="token-holder">
      <span
        class="token" v-for="token in data.tokens"
        :style="{
          transform
        }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    transform() {
      return `translateX(${-2 * (this.data.tokens - 1)}px)`
    }
  }
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
  padding: 4px;
  font-size: 12px;
  color: #8798aa
}
.token-holder {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -8px;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  white-space: nowrap;
}
.token {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(#ffcba3, .875);
  border-radius: 50%;

  &+.token {
    margin-left: -11px;
  }
}
</style>
