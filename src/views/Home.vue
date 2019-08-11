<template>
  <div class="home">
    <div class="menu">
        <router-link
          v-for="(scenario, idx) in scenarios"
          :to="{ name: 'mission', params: {slug: idx + 1} }"
        >
          {{idx + 1}}. {{scenario.name}}
        </router-link>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'

export default {
  name: "home",
  data() {
    return {
      selected: ''
    }
  },
  computed: {
    scenarios() {
      return store.scenarios
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.menu {
  display: flex;
  flex-direction: column;
}
</style>
