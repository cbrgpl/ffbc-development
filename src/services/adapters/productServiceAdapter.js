import ServiceAdapter from './serviceAdapter'

export default class ProductServiceAdapter extends ServiceAdapter {
  getProducts ( requestResult ) {
    const parsedBody = requestResult.parsedBody

    const newParsedBody = {
      count: parsedBody.count,
      products: this.getArrayOfRestructedProducts( parsedBody.results )
    }

    requestResult.parsedBody = newParsedBody
    return requestResult
  }

  getArrayOfRestructedProducts ( arrayOfProducts ) {
    const restructedBaseProducts = []

    for ( const product of arrayOfProducts ) {
      restructedBaseProducts.push( this.restructBaseProductData( product ) )
    }

    return restructedBaseProducts
  }

  getProductById ( requestResult ) {
    const product = requestResult.parsedBody

    const newProductStruct = {
      ...this.restructBaseProductData( product ),
      ...this.restructAdditionalProductData( product )
    }

    requestResult.parsedBody = newProductStruct

    return requestResult
  }

  restructBaseProductData ( product ) {
    const restructedBaseProduct = {}

    restructedBaseProduct.media = product.productMedia.map( ( media ) => {
      const transformedMedia = {}

      transformedMedia.display = media.imageDisplay
      transformedMedia.preview = media.imagePreview

      return transformedMedia
    } )

    restructedBaseProduct.type = product.productType.id
    restructedBaseProduct.price = product.basePrice
    restructedBaseProduct.description = product.description
    restructedBaseProduct.title = product.name
    restructedBaseProduct.id = product.id

    return restructedBaseProduct
  }

  restructAdditionalProductData ( product ) {
    const restructedAdditionalProduct = {}

    restructedAdditionalProduct.video = product.video

    return restructedAdditionalProduct
  }
}
