import { CustomError } from './custom-error'

export class FailedDependencyError extends CustomError {
  statusCode = 424

  constructor(public message = 'Failed Dependency') {
    super(message)
    Object.setPrototypeOf(this, FailedDependencyError.prototype)
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}
