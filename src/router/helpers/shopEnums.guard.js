import waiterOfActions from './waiterOfActions'

const actions = [
  'product/fetchProductFeatures',
  'measure/fetchMeasures',
  'product/fetchProductTypes'
]

export default async ( to, from ) => {
  await waiterOfActions.executeActions( actions )
}
