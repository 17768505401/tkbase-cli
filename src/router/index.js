import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import push from '@/pages/push'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/push',
      name: 'push',
      component: push
    }
  ]
})
