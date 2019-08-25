<template>
  <div class="kinder-gartner">
    <div class="token-board" v-if="compartment.capacity > 0">
      <span class="full-count">
        <span class="helper">
          <transition name="number-fold">
            <span :key="compartment.hold" class="count-helper">{{
              compartment.hold
            }}</span>
          </transition>
        </span>/{{ compartment.capacity }}
      </span><span class="label">{{ $t("tokens") }}</span>
    </div>
    <div class="container">
      <table class="table" cellspacing="0">
        <tr class="row" :key="xi" v-for="(x, xi) in rows">
          <Cell
            :key="i"
            :x="x - 1"
            :y="y - 1"
            :active="grid"
            v-for="(y, i) in columns"
            :data="data"
            @select="e => grid = e"
            @unselect="() => grid = {x: -1, y: -1}"
          />
        </tr>
      </table>

      <Peridot />
    </div>
    <div
      class="log"
      v-if="grid.y > -1 && grid.y > -1"
    >{{grid.y}}, {{grid.x}}</div>
  </div>
</template>

<script>
import Peridot from "@/components/Peridot.vue";
import Cell from "@/components/Cell.vue";
import store from "@/store/index";

export default {
  components: {
    Peridot,
    Cell
  },
  data() {
    return {
      grid: {
        x: -1,
        y: -1
      }
    }
  },
  computed: {
    rows() {
      return store.grid.rows;
    },
    columns() {
      return store.grid.columns;
    },
    data() {
      return store.grid.data;
    },
    walls() {
      return store.grid.walls;
    },
    compartment() {
      return store.robot.compartment;
    }
  }
};
</script>

<style scoped lang="scss">
.kinder-gartner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.container {
  position: relative;
}
.table {
  border-collapse: collapse;
  background-color: #ffffff;
}
.full-count {
  display: inline-block;
  position: relative;
}
.token-board {
  // font-size: 12px;
  color: #32325d;
  position: absolute;
  right: 28px;
  top: 28px;
  font-size: 38px;
  text-align: right;
  .label {
    display: block;
    font-size: 12px;
    color: #8898aa;
    text-transform: uppercase;
  }
}
.helper {
  position: absolute;
  display: inline-block;
  right: 100%;
}
.count-helper {
  display: block;
  position: absolute;
  right: 100%;
  will-change: transform, opacity;
}
.log {
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 48px;
  margin-left: 48px;
  color: #8898aa;
  transition: opacity .3s;
}
</style>
