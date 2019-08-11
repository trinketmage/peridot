<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap');
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
  font-family: 'Source Sans Pro', sans-serif;
}
#app {
  height: 100%;
  background: #f6f9fc;
}

.number-fold-enter-active,
.number-fold-leave-active {
  transition: opacity .3s, transform .3s
}
.number-fold-enter {
  opacity: 0;
  transform: translateY(-50%);
}
.number-fold-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
</style>
