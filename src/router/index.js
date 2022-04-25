import { createRouter, createWebHistory } from 'vue-router'

import EmptyLayout from '@layouts/EmptyLayout/EmptyLayout.vue'

import {
  getHiddenPartials,

  strategyGuard,
  rolesGuard,
  authGuard,
  resetPasswordGuard,
  getUserGuard,
  userEnumsGuard,
  shopEnumsGuard,
  aggregateGuard,
  cartGuard,
  fromRootGuard,
  userMeasuresGuard,
  subAppEnterGuard,

  GuardMetaAccesser
} from './helpers/index'

import { verificateEmailGuardStrategy } from '@/helpers/strategy'

const routes = [
  {
    path: '/',
    component: EmptyLayout,
    name: 'Root',
    beforeEnter: aggregateGuard,
    meta: {
      aggregate: GuardMetaAccesser.defineParam( {
        guards: [
          getUserGuard,
        ],
        // TODO Убрать endGuard
        endGuard: fromRootGuard,
      }, true ),
    },
    children: [
      {
        path: '/competitions',
        component: EmptyLayout,
        name: 'Competitions',
        beforeEnter ( to, from, next ) {
          next( { name: 'ShopTmp' } )
        },
        children: [
          {
            path: 'main',
            component: () => import( '@/views/Competition/Main/Main.vue' ),
            name: 'Main',
            meta: {
              layout: 'main',
            }
          },
          {
            path: 'sponsors',
            component: () => import( '@/views/Competition/Main/Main.vue' ),
            name: 'Sponsors',
            meta: {
              layout: 'main',
              roles: []
            }
          },
          {
            path: 'shows',
            component: () => import( '@/views/Competition/Main/Main.vue' ),
            name: 'Shows',
            meta: {
              layout: 'main',
              auth: false
            }
          },
          {
            path: 'developers',
            component: () => import( '@/views/Competition/Main/Main.vue' ),
            name: 'Developers',
            meta: {
              layout: 'main',
            }
          },
          {
            path: 'gallery',
            component: () => import( '@/views/Competition/Main/Main.vue' ),
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
                component: () => import( '@/views/Competition/Home/Main/Main.vue' ),
                name: 'HomeMain',
              },
              {
                path: 'update-data',
                component: () => import( '@/views/Competition/Home/UpdateData/UpdateData.vue' ),
                name: 'HomeUpdateData',
              },
              {
                path: 'competetions-history',
                component: () => import( '@/views/Competition/Home/Main/Main.vue' ),
                name: 'HomeCompetitionsHistory',
              },
              {
                path: 'services',
                component: () => import( '@/views/Competition/Home/Main/Main.vue' ),
                name: 'HomeServices',
              },
              {
                path: 'settings',
                component: () => import( '@/views/Competition/Home/Main/Main.vue' ),
                name: 'HomeSettings',
              },
            ]
          },
        ]
      },
      {
        path: '/shop',
        component: () => import( '@layouts/EmptyLayout/EmptyLayout.vue' ),
        beforeEnter: aggregateGuard,
        meta: {
          aggregate: GuardMetaAccesser.defineParam( {
            guards: [
              subAppEnterGuard,
              shopEnumsGuard,
              cartGuard,
            ],
          } )
        },
        children: [
          {
            path: '',
            component: () => import( '@layouts/ShopRootLayout/ShopRootLayout' ),
            props: getHiddenPartials( 'Shop' ),
            beforeEnter: aggregateGuard,
            meta: {
              aggregate: GuardMetaAccesser.defineParam( {
                guards: [
                  userMeasuresGuard,
                ],
              } )
            },
            children: [
              {
                path: '',
                component: () => import( '@/views/Preview.vue' ),
                name: 'ShopTmp',
              },
              {
                path: 'profile',
                component: () => import( '@layouts/ShopProfileLayout/ShopProfileLayout.vue' ),
                name: 'ShopProfile',
                props: getHiddenPartials( 'ShopProfile' ),
                redirect: { name: 'ShopProfileMain' },
                children: [
                  {
                    path: 'main',
                    component: () => import( '@/views/Shop/ProfileMain/ProfileMain.vue' ),
                    name: 'ShopProfileMain',
                    meta: {
                      ShopProfileHiddenPartials: [ 'TheBackBar' ]
                    }
                  },
                  {
                    path: 'cart',
                    component: () => import( '@/views/Shop/ProfileCart/ProfileCart.vue' ),
                    name: 'ShopProfileCart',
                  },
                  {
                    path: 'order-list',
                    component: () => import( '@/views/Shop/ProfileOrderList/ProfileOrderList.vue' ),
                    name: 'ShopProfileOrderList',
                  },
                  {
                    path: 'order-detail/:orderId',
                    component: () => import( '@/views/Shop/ProfileOrderDetail/ProfileOrderDetail.vue' ),
                    name: 'ShopProfileOrderDetail',
                    props: true,
                  },
                  {
                    path: 'measures',
                    component: () => import( '@/views/Shop/ProfileMeasures/ProfileMeasures.vue' ),
                    name: 'ShopProfileMeasures',
                  }
                ]
              },
              {
                path: 'products/:sectionCode',
                component: () => import( '@/views/Shop/ProductCatalog/ProductCatalog.vue' ),
                name: 'ShopProductCatalog',
                props: true,
              },
              {
                path: 'product/:productId',
                component: () => import( '@/views/Shop/ProductPage/ProductPage.vue' ),
                name: 'ShopProductPage',
                props: true
              },
            ]
          },
          {
            path: 'checkout',
            component: () => import( '@layouts/CheckoutRootLayout/CheckoutRootLayout.vue' ),
            props: getHiddenPartials( 'Checkout' ),
            beforeEnter: aggregateGuard,
            meta: {
              aggregate: GuardMetaAccesser.defineParam( {
                guards: [
                  userEnumsGuard,
                ],
              } ),
            },
            children: [
              {
                path: '',
                component: () => import( '@/views/Shop/Checkout/Checkout.vue' ),
                name: 'ShopCheckout',
              },
            ]
          },
        ]
      },
      {
        path: '/user',
        component: () => import( '@layouts/UserRootLayout/UserRootLayout' ),
        redirect: { name: 'UserMe' },
        beforeEnter: aggregateGuard,
        meta: {
          auth: true,
          aggregate: GuardMetaAccesser.defineParam( {
            guards: [
              subAppEnterGuard,
              userEnumsGuard,
            ],
          } ),
        },
        children: [
          {
            path: 'me',
            component: () => import( '@/views/User/Me/Me.vue' ),
            name: 'UserMe'
          },
          {
            path: 'account',
            component: () => import( '@/views/User/Account/Account.vue' ),
            name: 'UserAccount',
          },
          {
            path: 'contacts',
            component: () => import( '@/views/User/Contacts/Contacts.vue' ),
            name: 'UserContacts'
          }
        ]
      },
    ]
  },
  {
    path: '/verificate',
    component: EmptyLayout,
    beforeEnter: strategyGuard,
    meta: {
      verificateEmail: true,
      strategy: verificateEmailGuardStrategy
    }
  },
  {
    path: '/reset-password',
    component: () => import( '@/views/Service/ResetPassword.vue' ),
    props: true,
    beforeEnter: resetPasswordGuard
  },
  {
    path: '/server-disabled',
    component: EmptyLayout,
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
