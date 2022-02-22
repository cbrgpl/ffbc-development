import ServiceAdapter from './serviceAdapter'

export default class ProductServiceAdapter extends ServiceAdapter {
  getProducts ( result ) {
    const parsedBody = result.parsedBody
    console.log( parsedBody )

    const newParsedBody = {
      count: parsedBody.count,
      products: this.getArrayOfTransformedProducts( parsedBody.results )
    }

    result.parsedBody = newParsedBody
    return result
  }

  getArrayOfTransformedProducts ( arrayOfProducts ) {
    const transformedProducts = []

    for ( const product of arrayOfProducts ) {
      transformedProducts.push( this.transformProduct( product ) )
    }

    return transformedProducts
  }

  transformProduct ( product ) {
    const transformedProduct = {}

    transformedProduct.media = product.productMedia.map( ( media ) => media.image )
    transformedProduct.stockQnt = product.stockQty
    transformedProduct.price = product.basePrice
    transformedProduct.description = product.description
    transformedProduct.name = product.name
    transformedProduct.id = product.id

    return transformedProduct
  }
}
