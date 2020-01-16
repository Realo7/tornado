<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: Microsoft Yahei;
}
</style>

<script>
export default {
  name: 'App',
  mounted () {
    // const root = process.env.API_ROOT;
  }
}
</script>