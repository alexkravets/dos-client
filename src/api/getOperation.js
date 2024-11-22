import extendSchema from "./extendSchema"

const POST = "POST"
const PATCH = "PATCH"


const getOperation = (httpMethods, schemasMap, operationId) => {
  const operations = Object.keys(httpMethods)
  const isSupported = operations.includes(operationId)

  if (!isSupported) {
    const message = `Operation "${operationId}" is missing. ` +
      `Add "${operationId}" to "operations" list in "src/api.yaml" ` +
      'and run "npm run update".'

    throw new Error(message)
  }

  const isIndex = operationId.includes('/Index')
  const isCreate = httpMethods[operationId] === POST
  const isUpdate = httpMethods[operationId] === PATCH

  const httpMethod = httpMethods[operationId]

  const operationKey = operationId.replace('/', '_').toUpperCase()
  const formInputsKey = `${operationKey}_FORM_INPUTS`
  const tableColumnsKey = `${operationKey}_ITEM_SCHEMA`

  const formInputs = schemasMap[formInputsKey]

  const getSchema = (inputs = []) =>
    extendSchema(formInputs, inputs)

  const getIndexItemSchema = () => {
    const tableColumns = schemasMap[tableColumnsKey]

    if (!tableColumns) {
      const message = `Operation "${operationId}" has no index item schema.`

      throw new Error(message)
    }

    return tableColumns
  }

  const operation = {
    id: operationId,
    isIndex,
    isCreate,
    isUpdate,
    httpMethod,
    getIndexItemSchema
  }

  if (formInputs) {
    operation.schema = formInputs
    operation.getSchema = getSchema
  }

  return operation
}

export default getOperation
