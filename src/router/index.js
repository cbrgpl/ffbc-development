import { createRouter, createWebHistory } from 'vue-router'
import Preview from '@views/Preview.vue'

const routes = [
  // General
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
    path: '/sponsors',
    component: () => import( '@views/Main.vue' ),
    name: 'Sponsors',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/shows',
    component: () => import( '@views/Main.vue' ),
    name: 'Shows',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/developers',
    component: () => import( '@views/Main.vue' ),
    name: 'Developers',
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
  {
    path: '/shop',
    component: () => import( '@views/Main.vue' ),
    name: 'Shop',
    meta: {
      layout: 'main'
    }
  },
  // USER
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
    path: '/purchase',
    component: () => import( '@views/Main.vue' ),
    name: 'Purchase',
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/services',
    component: () => import( '@views/Main.vue' ),
    name: 'Services',
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
