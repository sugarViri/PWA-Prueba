import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/components/RouterView'),
    children: [
      {
        path: '',
        name: 'skeleto',
        component: () => import('@/views/profiles/views/Skeleto.vue')
      },
      {
        path: '/profiles',
        name: 'profiles',
        component: () => import('@/views/profiles/views/Perfiles.vue')
      },
      {
        path: 'detail/:profileId',
        name: 'profile-detail',
        component: () => import('@/views/profiles/views/PerfilDetalle.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
