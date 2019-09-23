<template>
  <div id="app">
    <router-view />
    <notifications group="foo" classes="my-style" />
  </div>
</template>

<style>
#app {
  height: 100%;
}
.my-style {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background-color: rgb(127, 255, 155);
  font-size: 20px;
  padding-top: 30px;
  padding-left: 20px;
}
</style>

<script>
export default {
  name: 'App'
}
</script>