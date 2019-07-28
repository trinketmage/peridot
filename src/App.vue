<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');

* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Source Sans Pro', sans-serif;
}
#app {
  height: 100%;
}
</style>
