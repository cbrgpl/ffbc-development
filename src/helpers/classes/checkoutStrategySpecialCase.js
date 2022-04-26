import CheckoutStrategy from './checkoutStrategy'

import { config } from '@/main.js'

export default class CheckoutStrategySpecialCase extends CheckoutStrategy {
  async sendData ( data ) {
    console.log( data )
    config.globalProperties.toast$.warn( { summary: 'qweqwe' } )
  }
}
