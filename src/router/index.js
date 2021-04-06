import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/profiles',
    component: () => import('@/components/RouterView'),
    children: [
      {
        path: '',
        name: 'profiles',
        component: () => import('@/views/profiles/views/Profiles.vue')
      },
      {
        path: 'detail/:profileId',
        name: 'profile-detail',
        component: () => import('@/views/profiles/views/ProfileDetail.vue'),
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
