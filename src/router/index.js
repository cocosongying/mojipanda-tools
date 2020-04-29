import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CalRelations from '@/components/other/CalRelations'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/tools',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/calrelations',
      component: CalRelations
    }
  ]
})
