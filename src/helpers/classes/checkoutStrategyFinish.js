import CheckoutStrategy from './checkoutStrategy'

import { config } from '@/main.js'
import NetworkAttemptError from '../errors/networkAttemptError'

export default class CheckoutStrategyFinish extends CheckoutStrategy {
  // TODO Можно orderId прокинуть через provide\inject и подготовкой данных заниматься в самом компоненте, а не тут
  async sendData ( measures, ids ) {
    const orderId = ids.orderId
    const measureFieldArray = this.getMeasureFieldArray( measures )

    this.mixOrderId( measureFieldArray, orderId )

    const createMeasures = await this.orderService.orderMeasuresCreate( measureFieldArray )

    if ( createMeasures.httpResponse.status === 201 ) {
      this.finishOrderCheckout( ids )
    } else {
      throw new NetworkAttemptError( createMeasures.httpResponse )
    }
  }

  getMeasureFieldArray ( measures ) {
    const measureFieldArray = []

    for ( const measureName in measures ) {
      const measure = measures[ measureName ]

      for ( const measureField of measure ) {
        measureFieldArray.push( measureField )
      }
    }

    return measureFieldArray
  }

  mixOrderId ( measureFieldArray, orderId ) {
    for ( const measureField of measureFieldArray ) {
      measureField.order = orderId
    }
  }

  finishOrderCheckout ( { userId, orderId } ) {
    const toastDetail = this.getToastDetails( userId )
    config.globalProperties.toast$.success( { summary: `Order #${ orderId } created`, detail: toastDetail, life: 15000 } )
    config.globalProperties.$router.push( { name: 'ShopTmp' } )
  }

  getToastDetails ( userId ) {
    const generalPart = 'Administrator soon will contact with you.<br>'
    const partByUserType = userId !== null ? 'You can explore details in your profile.' : 'Unfortunately, you can\'t explore order detail.'

    return generalPart + partByUserType
  }
}
