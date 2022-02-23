import ServiceAdapter from './serviceAdapter'

export default class ProductServiceAdapter extends ServiceAdapter {
  getProducts ( result ) {
    const parsedBody = result.parsedBody

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

    transformedProduct.media = product.productMedia.map( ( media ) => {
      const transformedMedia = {}

      transformedMedia.src = media.image
      transformedMedia.display = media.imageDisplay
      transformedMedia.preview = media.imagePreview

      return transformedMedia
    } )

    transformedProduct.stockQnt = product.stockQty
    transformedProduct.price = product.basePrice
    transformedProduct.description = product.description
    transformedProduct.title = product.name
    transformedProduct.id = product.id

    return transformedProduct
  }
}
