<template>
  <td
    :class="[
      'cell',
      {
        'bottom-wall': cell.bottom.wall,
        'right-wall': cell.right.wall,
        arrival: cell.arrival
      },
      padding
    ]"
  >
    <div class="cell-sizer">
      <transition name="number-fold">
        <span class="count-holder" :key="cell.tokens" v-if="cell.tokens > 0">{{
          cell.tokens
        }}</span>
      </transition>
      <div class="token-holder">
        <span
          :key="i"
          class="token"
          v-for="(token, i) in tokens"
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
  props: ["x", "y", "data", "table"],
  computed: {
    cell() {
      return this.data[this.x][this.y]
    },
    tokens() {
      return Math.min(this.cell.tokens, 4)
    },
    transform() {
      return `translateX(${-2 * (this.tokens - 1)}px)`;
    },
    padding() {
      const { cell, data, x, y } = this
      const padding = []
      if(
        cell.right.wall &&
        (
          (data[x - 1] && (data[x - 1][y].bottom.wall || data[x - 1][y].right.wall))) ||
          (data[x - 1] && data[x - 1][y + 1] && data[x - 1][y + 1].bottom.wall)
      ) {
        padding.push('pad-top-right')
      }
      if(data[x][y - 1] && (data[x][y - 1].bottom.wall || data[x][y - 1].right.wall)) {
        padding.push('pad-bottom-left')
      }
      return padding
    }
  }
};
</script>

<style scoped lang="scss">
.cell {
  width: 48px;
  height: 48px;
  border: 4px solid #f6f9fc;
  position: relative;
}
.bottom-wall {
  &:after {
    content: "";
    display: block;
    width: auto;
    left: 0;
    right: 0;
    height: 4px;
    position: absolute;
    background-color: #6772e5;
    top: 100%;
  }
  &.pad-bottom-left {
    &:after {
      margin-left: -4px;
    }
  }
  &.right-wall {
    &:after {
      margin-right: -4px;
    }
  }
}
.right-wall {
  &:before {
    content: "";
    display: block;
    height: auto;
    top: 0;
    bottom: 0;
    width: 4px;
    position: absolute;
    background-color: #6772e5;
    left: 100%;
  }
  &.pad-top-right {
    &:before {
      margin-top: -4px;
    }
  }
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
  color: #8798aa;
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
  border: 2px solid rgba(#ffcba3, 0.875);
  border-radius: 50%;

  & + .token {
    margin-left: -11px;
  }
}
.count-holder {
  position: absolute;
  top: 0;
  right: 0;
  padding: 4px;
  will-change: transform, opacity;
  z-index: 1;
}
</style>
