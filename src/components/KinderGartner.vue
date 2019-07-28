<template>
  <div class="kinder-gartner">
    <div class="token-board">Tokens: {{compartment.hold}} / {{compartment.capacity}}</div>
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
  background-color: #7ae8ff;
  display: flex;
  justify-content: center;
  align-items: center;
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
      border: 1px solid #364781;
      position: relative
    }
  }
}
.token-board {
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  position: absolute;
  right: 28px;
  top: 28px;
}
</style>
