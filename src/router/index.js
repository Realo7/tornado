import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/Ham/home.vue'
import User from '../components/users/user.vue'
import Tt from '../components/users/tt.vue'
import Worktable from '../components/operate/worktable.vue'
import Operate from '../components/operate/operate.vue'
import Op1 from '../components/operate/op/op1'
import Op2 from '../components/operate/op/op2'
import Op3 from '../components/operate/op/op3'

import Try from '../components/operate/try.vue'
import Kefu from '../components/kefu/kefu.vue'
import Kefubb from '../components/kefu/kefubb.vue'
import Peizhi from '../components/peizhi/peizhi.vue'

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
      // redirect: { name: 'operate' },
      children: [
        { name: 'user', path: 'user', component: User },
        { name: 'tt', path: 'tt', component: Tt },
        { name: 'worktable', path: 'worktable', component: Worktable },
        { name: 'operate', path: 'operate', component: Operate },
        { name: 'try', path: 'try', component: Try },
        { name: 'kefu', path: 'kefu', component: Kefu },
        { name: 'kefubb', path: 'kefubb', component: Kefubb },
        { name: 'peizhi', path: 'peizhi', component: Peizhi }
      ]
    }
  ]
})
