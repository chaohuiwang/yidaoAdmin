<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  .size {
    width: 100%;
    height: 100%;
  }
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
