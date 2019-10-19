<template>
  <div id="app">
    <router-view />
    <notifications group="foo" classes="my-style"></notifications>
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: Microsoft Yahei;
}
.my-style {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background-color: rgb(243, 174, 44);
  font-size: 20px;
  padding-top: 30px;
  padding-left: 20px;
}
</style>

<script>
export default {
  name: 'App',
  mounted() {
    // const root = process.env.API_ROOT;
    console.log(this.$axios.baseURL)
  }
}
</script>