
export default class UnexpectedReponseError extends Error {
  constructor(operationId, sentryExtra) {
    super(`Unexpected error response for ${operationId}`)

    this.code = "UnexpectedReponseError"
    this.sentryExtra = sentryExtra
  }
}
