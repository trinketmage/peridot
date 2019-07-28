<template>
  <div class="kinder-gartner">
    <div class="container">
      <table class="table" cellspacing="0">
        <tr class="row" v-for="i in rows">
          <td class="cell" v-for="y in columns"></td>
        </tr>
      </table>
      <Peridot
        :position="robot.position"
        :direction="robot.direction"
      />
    </div>
  </div>
</template>

<script>
import Peridot from "@/components/Peridot.vue"

export default {
  components: {
    Peridot
  },
  props: ['robot'],
  data () {
    return {
      rows: 10,
      columns: 10
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
    }
  }
}
</style>
