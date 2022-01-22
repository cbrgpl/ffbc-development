export default class ConstructorNamedError extends Error {
  constructor ( ...params ) {
    super( ...params )

    this.name = this.constructor.name
  }
}
