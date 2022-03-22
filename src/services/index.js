import * as services from './services'

import getServiceProxy from './helpers/getServiceProxy'

import ProductServiceAdapter from './adapters/productServiceAdapter'

const exportServices = {
  ...services,
}

exportServices.productService = getServiceProxy( new ProductServiceAdapter(), exportServices.productService )

export const {
  authService,
  userService,
  productService,
  measureService,
  cartService,
  contactsService
} = exportServices
