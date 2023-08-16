import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/Explorer',
      name: 'explorer',
      component: () => import('../views/Explorer.vue')
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
