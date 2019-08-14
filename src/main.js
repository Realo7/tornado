// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
//用法二
import useaxios from '@/plugins/useaxios.js'

// axios用法一
// import axios from 'axios'
// Vue.prototype.$http = axios

Vue.config.productionTip = false

//使用vue插件
Vue.use(ElementUI)
Vue.use(useaxios)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
