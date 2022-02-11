import { createRouter, createWebHistory } from 'vue-router'

import Preview from '@views/Preview.vue'

import {
  commandGuard,
  rolesGuard,
  authGuard,
  resetPasswordGuard,

  getRedirectOnLargeScreen,
  getVerifyEmailGuardParams,
} from './helpers/index'

import { ReqVerifyEmailCommand } from '@commands'

const routes = [
  {
    path: '/',
    component: Preview,
    name: 'Preview',
    redirect: { name: 'ShopMain' },
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/competitions',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    name: 'Competitions',
    beforeEnter ( to, from, next ) {
      next( { name: 'ShopMain' } )
    },
    children: [
      {
        path: 'main',
        component: () => import( '@views/Main.vue' ),
        name: 'Main',
        meta: {
          layout: 'main',
        }
      },
      {
        path: 'sponsors',
        component: () => import( '@views/Main.vue' ),
        name: 'Sponsors',
        meta: {
          layout: 'main',
          roles: [ 'qwe' ]
        }
      },
      {
        path: 'shows',
        component: () => import( '@views/Main.vue' ),
        name: 'Shows',
        meta: {
          layout: 'main',
          auth: false
        }
      },
      {
        path: 'developers',
        component: () => import( '@views/Main.vue' ),
        name: 'Developers',
        meta: {
          layout: 'main',
        }
      },
      {
        path: 'gallery',
        component: () => import( '@views/Main.vue' ),
        name: 'Gallery',
        meta: {
          layout: 'main',
        }
      },
      {
        path: 'home',
        component: () => import( '@layouts/HomeLayout/HomeLayout.vue' ),
        name: 'Home',
        redirect: { name: 'HomeMain' },
        meta: {
          layout: 'main',
          auth: true,
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
    ]
  },
  {
    path: '/shop',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    name: 'Shop',
    redirect: { name: 'ShopMain' },
    meta: {
      layout: 'shop-main'
    },
    children: [
      {
        path: 'main',
        component: () => import( '@/views/HomeMain/HomeMain.vue' ),
        name: 'ShopMain',
      },
      {
        path: 'profile',
        component: () => import( '@layouts/ShopProfileLayout/ShopProfileLayout.vue' ),
        name: 'ShopProfile',
        redirect: { name: 'ShopProfileMain' },
        children: [
          {
            path: 'main',
            component: () => import( '@views/Shop/ProfileMain.vue' ),
            name: 'ShopProfileMain',
            beforeEnter: getRedirectOnLargeScreen( 1024, 'ShopProfileCart' ),
            meta: {
              hidden: [ 'TheBackBar' ]
            }
          },
          {
            path: 'cart',
            component: () => import( '@/views/Shop/ProfileCart/ProfileCart.vue' ),
            name: 'ShopProfileCart',
          },
          {
            path: 'order-list',
            component: () => import( '@views/Shop/ProfileOrderList.vue' ),
            name: 'ShopProfileOrderList',
          },
          {
            path: 'order-detail/:orderId',
            component: () => import( '@views/Shop/ProfileOrderDetail.vue' ),
            name: 'ShopProfileOrderDetail',
            props: true,
          }
        ]
      },
      {
        path: 'products/:productType',
        component: () => import( '@/views/Shop/ProductCatalog.vue' ),
        name: 'ShopProductCatalog',
      },
      {
        path: 'product/:productId',
        component: () => import( '@/views/Shop/ProductPage/ProductPage.vue' ),
        name: 'ShopProductPage',
        props: true
      }
    ]
  },
  {
    path: '/verificate',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    beforeEnter: commandGuard,
    meta: {
      verificateEmail: true,
      command: new ReqVerifyEmailCommand( getVerifyEmailGuardParams )
    }
  },
  {
    path: '/reset-password',
    component: () => import( '@/views/ResetPassword.vue' ),
    props: true,
    beforeEnter: resetPasswordGuard
  },
  {
    path: '/server-disabled',
    component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
    name: 'ServerDisabled',
  }
]

const router = createRouter( {
  history: createWebHistory( process.env.BASE_URL ),
  routes,
} )

router.beforeEach( authGuard )
router.beforeEach( rolesGuard )

export default router
