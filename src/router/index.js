import { createRouter, createWebHistory } from 'vue-router'
import Preview from '@views/Preview.vue'
import { verifyEmail, checkRoles } from './helpers/index'

const routes = [
  // General
  {
    path: '/',
    component: Preview,
    name: 'Preview',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/main',
    component: () => import( '@views/Main.vue' ),
    name: 'Main',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/sponsors',
    component: () => import( '@views/Main.vue' ),
    name: 'Sponsors',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/shows',
    component: () => import( '@views/Main.vue' ),
    name: 'Shows',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/developers',
    component: () => import( '@views/Main.vue' ),
    name: 'Developers',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/gallery',
    component: () => import( '@views/Main.vue' ),
    name: 'Gallery',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/shop',
    component: () => import( '@views/Main.vue' ),
    name: 'Shop',
    meta: {
      layout: 'main',
    }
  },
  // USER
  {
    path: '/home',
    component: () => import( '@layouts/HomeLayout/HomeLayout.vue' ),
    name: 'Home',
    meta: {
      layout: 'main',
      hiddenElems: [ 'TheStaticSidebar', 'TheStaticSidebarMobile' ]
    },
    props: {
      hiddenElems: [],
    },
    children: [
      {
        path: 'main',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomeMain',
      },
      {
        path: 'update-data',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomeUpdateData',
      },
      {
        path: 'competetions-history',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomeCompetitionsHistory',
      },
      {
        path: 'services',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomeServices',
      },
      {
        path: 'purchases',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomePurchasedServices',
      },
      {
        path: 'settings',
        component: () => import( '@views/HomeMain.vue' ),
        name: 'HomeSettings',
      },
    ]
  },
  { // TODO удалить роут
    path: '/settings',
    component: () => import( '@views/Main.vue' ),
    name: 'Settings',
    meta: {
      layout: 'main',
    }
  },
  { // TODO удалить роут
    path: '/purchase',
    component: () => import( '@views/Main.vue' ),
    name: 'Purchase',
    meta: {
      layout: 'main',
    }
  },
  { // TODO удалить роут
    path: '/services',
    component: () => import( '@views/Main.vue' ),
    name: 'Services',
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/verificate',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    beforeEnter: verifyEmail
  },
  {
    path: '/reset-password',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    beforeEnter ( to, from, next ) {
      if ( localStorage.getItem( 'var_passwordResetRequested' ) === 'true' ) {
        next()
        return
      }

      next( { name: 'Main' } )
    }
  }
]

const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes
} )

router.beforeEach( checkRoles )

export default router
