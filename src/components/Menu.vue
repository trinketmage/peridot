<template>
  <div class="menu" id="menu">
    <div class="sizer">
      <h3>Missions</h3>
      <div
        class="repeater"
        :key="idx"
        v-for="(scenario, idx) in scenarios"
      >
        <router-link
          class="underline"
          :to="{ name: 'mission', params: { locale: $route.params.locale, id: idx + 1 } }"
        >
          <span class="caption"><span class="bold">{{ idx + 1 }}</span>. {{ scenario.name }}</span>
        </router-link>
      </div>
  </div>
    <div class="tongue" />
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  computed: {
    scenarios() {
      return store.scenarios;
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  left: 0;
  top: 0;
  width: 35vw;
  z-index: 1;
  min-width: 252px;
  max-width: 400px;
  transition: transform 1s ease;
  transform: translateX(-100%);
  will-change: transform;
  &:hover {
    transform: translateX(0%);
  }
}
.sizer {
  width: 100%;
  height: 100%;
  padding: 48px;
  background-color: rgba(255, 255, 255, .875);
  box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025);
  overflow: auto;

}
.home ~ .menu {
  transform: translateX(0%);
}
h3 {
  color: #24b47e;
}
.repeater {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
a {
  font-size: 14px;
  color: #697386;
  line-height: 17px;
  margin: 4px 0;
  text-decoration: none;
  display: inline-block;
}
.tongue {
  position: fixed;
  width: 25px;
  height: 100%;
  left: 100%;
  top: 0;
  background-color: rgba(0,0,0,0);
}
</style>
