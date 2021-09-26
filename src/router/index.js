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
  { // * РОУТ ДЛЯ МАГАЗИНА КОТОРЫЙ БУДЕТ ОЧЕНЬ НЕ СКОРО
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
    redirect: { name: 'HomeMain' },
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
        component: () => import( '@/views/HomeMain/HomeMain.vue' ),
        name: 'HomeMain',
      },
      {
        path: 'update-data',
        component: () => import( '@/views/HomeUpdateData/HomeUpdateData.vue' ),
        name: 'HomeUpdateData',
      },
      {
        path: 'competetions-history',
        component: () => import( '@/views/HomeMain/HomeMain.vue' ),
        name: 'HomeCompetitionsHistory',
      },
      {
        path: 'services',
        component: () => import( '@/views/HomeMain/HomeMain.vue' ),
        name: 'HomeServices',
      },
      {
        path: 'settings',
        component: () => import( '@/views/HomeMain/HomeMain.vue' ),
        name: 'HomeSettings',
      },
    ]
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
