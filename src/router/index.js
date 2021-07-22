import { createRouter, createWebHistory } from 'vue-router'
import Main from '@views/Main.vue'
import Preview from '@views/Preview.vue'

const routes = [
  {
    path: '/',
    component: Preview,
    name: 'Preview',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/main',
    component: () => import( '@views/Main.vue' ),
    name: 'Main',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/library',
    component: () => import( '@views/Main.vue' ),
    name: 'Library',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/home',
    component: () => import( '@views/Main.vue' ),
    name: 'Home',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/settings',
    component: () => import( '@views/Main.vue' ),
    name: 'Settings',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/competitions',
    component: () => import( '@views/Main.vue' ),
    name: 'Competitions',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/gallery',
    component: () => import( '@views/Main.vue' ),
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
