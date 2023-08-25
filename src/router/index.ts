// eslint-disable-next-line no-unused-vars
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/Explorer/:artist?',
      name: 'explorer',
      component: () => import('../views/Explorer.vue'),
      props: true
    },
    {
      path: '/Detail/:id',
      name: 'detail',
      component: () => import('../views/Detail.vue'),
      props: true
    }
  ]
})

export default router
