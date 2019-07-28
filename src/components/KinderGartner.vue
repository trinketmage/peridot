<template>
  <div class="kinder-gartner">
    <div class="token-board">{{compartment.hold}} / {{compartment.capacity}}<span class="label">TOKENS</span></div>
    <div class="container">
      <table class="table" cellspacing="0">
        <tr class="row" v-for="x in rows">
          <td class="cell" v-for="y in columns">
            <Cell :data="data[x-1][y-1]"/>
          </td>
        </tr>
      </table>
      <!-- <Wall v-for="wall in walls" :data="wall"/> -->
      <Peridot/>
    </div>
  </div>
</template>

<script>
import Peridot from "@/components/Peridot.vue"
import Cell from "@/components/Cell.vue"
import Wall from "@/components/Wall.vue"
import store from '@/store/index'

export default {
  components: {
    Peridot,
    Cell,
    Wall
  },
  computed: {
    rows() {
      return store.grid.rows
    },
    columns() {
      return store.grid.columns
    },
    data() {
      return store.grid.data
    },
    walls() {
      return store.grid.walls
    },
    compartment() {
      return store.robot.compartment
    }
  }
}
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
  .row {
    .cell {
      width: 48px;
      height: 48px;
      border: 4px solid #f6f9fc;
      background-color: #ffffff;
      position: relative
    }
  }
}
.token-board {
  // font-size: 12px;
  color: #32325d;
  position: absolute;
  right: 28px;
  top: 28px;
  font-size: 38px;
  text-align: center;
  .label{
    display: block;
    font-size: 19px;
    color: #8898aa;
    margin-top: 7px;
  }
}
</style>
