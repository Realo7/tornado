import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/Ham/home.vue'
import User from '@/components/users/user.vue'
import Operate from '@/components/operate/operate.vue'
import Kefu from '@/components/kefu/kefu.vue'
import Kefubb from '@/components/kefu/kefubb.vue'
import Peizhi from '@/components/peizhi/peizhi.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        { name: 'user', path: 'user', component: User },
        { name: 'operate', path: 'operate', component: Operate },
        { name: 'kefu', path: 'kefu', component: Kefu },
        { name: 'kefubb', path: 'kefubb', component: Kefubb },
        { name: 'peizhi', path: 'peizhi', component: Peizhi }
      ]
    }
  ]
})
