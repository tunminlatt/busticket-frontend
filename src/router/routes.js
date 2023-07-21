export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/bus/:id?',
    name: 'Bus',
    component: () => import('@/views/Bus.vue')
  },
]