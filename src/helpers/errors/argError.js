class ArgError extends Error {
  constructor ( argValue, argErrorMessage, ...params ) {
    super( ...params )

    this.argValue = argValue
    this.argErrorMessage = argErrorMessage
  }
}

export {
  ArgError
}
