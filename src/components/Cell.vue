<template>
  <td
    :class="[
      'cell',
      {
        'bottom-wall': data.bottom.wall,
        'right-wall': data.right.wall,
        'arrival': data.arrival,
      }
    ]"
  >
  <!-- {{data}} -->
    <div class="cell-sizer">
      <transition name="number-fold">
        <span
          class="count-holder"
          :key="data.tokens"
          v-if="data.tokens > 0"
        >{{data.tokens}}</span>
      </transition>
      <div
        class="token-holder"
      >
        <span
          :key="i"
          class="token"
          v-for="(token, i) in data.tokens"
          :style="{
            transform
          }"
        />
      </div>
    </div>
  </td>
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
.cell {
  width: 48px;
  height: 48px;
  border: 4px solid #f6f9fc;
  position: relative
}
.bottom-wall {
  border-bottom-color: #6772e5;
}
.right-wall {
  border-right-color: #6772e5;
}
.arrival {
  background-color: #a1ebb1;
}
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
.count-holder {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  will-change: transform, opacity;
}
</style>
