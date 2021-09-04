import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Draw from '@/components/Draw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    }
  ]
})
