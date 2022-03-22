import waiterOfActions from './waiterOfActions'

export default async ( to, from, next ) => {
  const actions = [
    'product/fetchProductFeatures',
    'measure/fetchMeasures',
    'product/fetchProductTypes'
  ]

  await waiterOfActions.executeActions( actions )

  next()
}
