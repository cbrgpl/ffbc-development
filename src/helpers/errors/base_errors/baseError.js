export default class BaseError extends Error {
  constructor ( ...params ) {
    super( ...params )
    this.name = this.constructor.name
  }
}
