
import { wait } from "./wait"
import getUrlQueryString from "./getUrlQueryString"
import RequestFailedError from "./RequestFailedError"
import UnexpectedReponseError from "./UnexpectedReponseError"

const isLocal = window.location.host.startsWith('localhost')

const RETRY_COUNT = 5
const RETRY_DELAY_MS = 1000


const fetchRetry = async (...args) => {
  let count = RETRY_COUNT

  while(count > 0) {
    try {
      const response = await fetch(...args)
      return response

    } catch(error) {
      console.error('Fetch request failed:', error)

    }

    // eslint-disable-next-line no-console
    console.info(`Retrying request after ${RETRY_DELAY_MS}ms`)

    await wait(RETRY_DELAY_MS)

    count -= 1
  }

  throw new Error(`Fetch request failed after ${RETRY_COUNT} retry attempts`)
}


const jsonRequest = async (operationUrl, method, operationId, parameters = {}, headers = {}) => {
  if (isLocal) {
    // eslint-disable-next-line no-console
    console.info(operationId, parameters)
  }

  const { mutation, ...query } = parameters

  const options = {
    headers: { ...headers, 'Content-Type': 'application/json' },
    method,
  }

  if (mutation) {
    options.body = JSON.stringify(mutation)
  }

  const hasQuery = Object.keys(query).length > 0

  if (hasQuery) {
    operationUrl += `?${getUrlQueryString(query)}`
  }

  const getSentryExtra = error => {
    const errorJson = JSON.stringify(error, null, 2)
    const mutationJson = options.body

    return {
      method,
      errorJson,
      operationId,
      mutationJson,
      operationUrl,
    }
  }

  let response

  try {
    response = await fetchRetry(operationUrl, options)

  } catch (error) {
    const sentryExtra = getSentryExtra(error)
    throw new RequestFailedError(operationId, sentryExtra)

  }

  let data
  let error
  let pageInfo

  const hasBody = response.status !== 204

  if (hasBody) {
    const result = await response.json()

    data = result.data
    error = result.error
    pageInfo = result.pageInfo
  }

  if (!response.ok) {
    const sentryExtra = getSentryExtra(error || response)
    const err = new UnexpectedReponseError(operationId, sentryExtra)

    if (error) {
      err.code = error.code
      err.originalError = error
    }

    throw err
  }

  return {
    data,
    pageInfo,
    headers: response.headers
  }
}

export default jsonRequest
