<template>
  <div id="app">
    <router-view :key="$route.params.id"/>
    <MainMenu />
  </div>
</template>

<script>
import MainMenu from "@/components/Menu.vue";

export default {
  components: {
    MainMenu
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap");
::selection {
  background-color: #f33e35;
  color: #ffffff;
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: #ffffff;
}
::-webkit-scrollbar-thumb {
  background: #6772e4;
}
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: "Source Sans Pro", sans-serif;
}
#app {
  height: 100%;
  background: #f6f9fc;
}

.number-fold-enter-active,
.number-fold-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.number-fold-enter {
  opacity: 0;
  transform: translateY(-50%);
}
.number-fold-leave-to {
  opacity: 0;
  transform: translateY(50%);
}

.underline{
    overflow: hidden;
    position: relative;
    display: inline-block;
    cursor: pointer;
    &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #697386;
        transform: translateX(100%);
        margin-right: 1px;
        opacity: 0;
        transition: opacity 0s .3s, transform .3s;
        will-change: opacity, transform;
    }
    &:after {
        content: '';
        display: block;
        position: absolute;
        margin-left: -1px;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #697386;
        transform: translateX(-100%);
        transition:  opacity 0s .3s, transform .3s ease;
        will-change: opacity, transform;
    }
    &:hover,
    &.active,
    &.router-link-active {
        &:before {
            opacity: 1;
            transform: translateX(0);
        }
        &:after {
            opacity: 0;
            transform: translateX(0%);
        }
    }
}
.bold {
  font-weight: bold
}
</style>
