<template>
  <div class="kinder-gartner">
    <div class="token-board" v-if="compartment.capacity > 0">
      <span class="helper">
        <transition name="number-fold">
          <span :key="compartment.hold" class="count-helper">{{
            compartment.hold
          }}</span>
        </transition>
      </span>
      / {{ compartment.capacity }}<span class="label">{{ $t("tokens") }}</span>
    </div>
    <div class="container">
      <table class="table" cellspacing="0">
        <tr class="row" :key="xi" v-for="(x, xi) in rows">
          <Cell :key="i" :data="data[x - 1][y - 1]" v-for="(y, i) in columns" />
        </tr>
      </table>

      <Peridot />
    </div>
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
.token-board {
  // font-size: 12px;
  color: #32325d;
  position: absolute;
  right: 28px;
  top: 28px;
  font-size: 38px;
  text-align: center;
  .label {
    display: block;
    font-size: 19px;
    color: #8898aa;
    margin-top: 7px;
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
</style>
