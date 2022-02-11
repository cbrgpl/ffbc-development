import NetworkAttemptError from './networkAttemptError'

export default class CommandExecutionError extends NetworkAttemptError {
  constructor ( commandConstructorName, ...params ) {
    super( ...params )

    this.commandConstructorName = commandConstructorName
  }
}
