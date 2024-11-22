
export default class RequestFailedError extends Error {
  constructor(operationId, sentryExtra) {
    super(`Fetch request failed for ${operationId}`)

    this.code = 'RequestFailedError'
    this.sentryExtra = sentryExtra
  }
}
