import jsonRequest from "./jsonRequest"

const MAX_PER_PAGE_LIMIT = 999


const getRequest = host => {
  const apiRequest = async (operation, parameters = {}, headers = {}) => {
    const {
      id: operationId,
      isIndex,
      httpMethod,
    } = operation


    const url = `https://${host}/api/${operationId}`

    if (!isIndex) {
      const result = await jsonRequest(url, httpMethod, operationId, parameters, headers)

      return result
    }

    const { limit: customLimit } = parameters

    let data = []
    let isLastPage = false
    let exclusiveStartKey = null

    do {
      const newParams = {
        limit: MAX_PER_PAGE_LIMIT,
        ...parameters,
      }

      if (exclusiveStartKey) {
        newParams.exclusiveStartKey = exclusiveStartKey
      }

      const response = await jsonRequest(url, httpMethod, operationId, newParams, headers)

      const {
        data: responseData,
        pageInfo: responsePageInfo
      } = response

      data = [...data, ...responseData]

      const { lastEvaluatedKey: nextExclusiveStartKey } = responsePageInfo

      exclusiveStartKey = nextExclusiveStartKey
      isLastPage = !exclusiveStartKey

      if (customLimit) {
        isLastPage = true
      }
    } while (!isLastPage)

    return { data }
  }

  return apiRequest
}

export default getRequest
