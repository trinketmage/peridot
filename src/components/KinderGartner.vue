<template>
  <div class="kinder-gartner">
    <div class="container">
      <table class="table" cellspacing="0">
        <tr class="row" v-for="i in rows">
          <td class="cell" v-for="y in columns"></td>
        </tr>
      </table>
      <Peridot
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
  data () {
    return {
      rows: 5,
      columns: 5
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
