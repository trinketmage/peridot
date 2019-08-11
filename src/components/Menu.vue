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
    <div class="tongue">
      <span class="icon">
        <svg width="16px" height="20px" viewBox="0 0 129 129" >
            <path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z"/>
        </svg>

      </span>
    </div>
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
    .tongue {
      transition: transform 1s ease;
      transform: translateX(-100%);
      will-change: transform;
    }
  }
}
.tongue {
  position: fixed;
  width: 50px;
  height: 50px;
  height: 50px;
  left: 100%;
  top: 50%;
  margin-left: -25px;
  margin-top: -25px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
  transition: transform 1s ease;
  will-change: transform;
  transform: translateX(0%);

  .icon {
    color: #000000;
    display: flex;
    width: 50%;
    margin-left: auto;
    height: 100%;
    align-items: center;
    justify-content: center;
    path {
      fill: #6772e4;
    }
  }
}
.home ~ .menu {
  transform: translateX(-100%);
  .tongue {
    transition: transform 1s ease;
    transform: translateX(-100%);
    will-change: transform;
  }
}
.sizer {
  width: 100%;
  height: 100%;
  padding: 48px;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 0 8px 16px -8px rgba(0,0,0,.3), 0 -6px 16px -6px rgba(0,0,0,.025);
  overflow: auto;
  position: relative;
  z-index: 1;
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
</style>
