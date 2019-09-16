// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import echarts from 'echarts'
// 为axios的baseurl引入变量文件
import url from '../static/config'


import axios from 'axios'


axios.defaults.baseURL = "/api";
import VueAxios from 'vue-axios'

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;



Vue.config.productionTip = false
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//使用vue插件
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(echarts)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
