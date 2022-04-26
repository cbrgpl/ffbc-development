export default class CheckoutStrategy {
  constructor ( serviceMethodName ) {
    this.serviceMethodName = serviceMethodName
  }

  async sendData ( data ) {
    return await new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        console.log( data )
        resolve()
      }, 4500 )
    } )
  }
}
