import { createRouter, createWebHistory } from 'vue-router'
import Main from '@views/Main.vue'

const routes = [
  {
    path: '/',
    component: Main,
    name: 'Main',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/home',
    component: Main,
    name: 'Home',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/settings',
    component: Main,
    name: 'Settings',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/competitions',
    component: Main,
    name: 'Competitions',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/gallery',
    component: Main,
    name: 'Gallery',
    meta: {
      layout: 'main'
    }
  },
]

// TODO need to make permissions system
const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes
} )

export default router
