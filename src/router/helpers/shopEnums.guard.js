import waiterOfActions from './waiterOfActions'

const actions = [
  'product/fetchProductFeatures',
  'measure/fetchMeasures',
  'product/fetchProductTypes',
  'order/fetchOrderSpecs'
]

export default async () => {
  await waiterOfActions.executeActions( actions )
}
