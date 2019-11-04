<template>
  <div id="app">
    <router-view />
    <notifications group="foo" classes="my-style1" position="top right"></notifications>
    <notifications group="fo2" classes="my-style101" position="bottom right"></notifications>
    <notifications group="goo" classes="my-style2" position="top right"></notifications>
    <notifications group="coo" classes="my-style3" position="top center"></notifications>
  </div>
</template>

<style>
#app {
  height: 100%;
  font-family: Microsoft Yahei;
}
.my-style1 {
  border-radius: 10px;
  opacity: 1;
  width: 400px;
  height: 160px;
  background-color: rgb(243, 174, 44);
  font-size: 24px;
  padding-top: 30px;
  padding-left: 20px;
  line-height: 40px;
}
.my-style101 {
  border-radius: 10px 10px 10px 10px;
  opacity: 1;
  max-width: 600px;
  height: 240px;
  background-color: rgb(240, 243, 44);
  font-size: 24px;
  padding-top: 30px;
  padding-left: 20px;

  line-height: 40px;
}
.my-style2 {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background-color: rgb(44, 243, 127);
  font-size: 24px;
  padding-top: 30px;
  padding-left: 20px;
}
.my-style3 {
  border-radius: 10px;
  opacity: 0.8;
  width: 400px;
  height: 160px;
  background-color: rgb(252, 47, 47);
  font-size: 24px;
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