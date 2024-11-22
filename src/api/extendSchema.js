import { keyBy } from "lodash"

const TYPE_OBJECT = "object"


const extendSchema = (schema, inputs) => {
  const inputKeys = inputs.map(input => input.name)
  const schemaKeys = schema.map(input => input.name)

  const extraKeys = schemaKeys.filter(key => !inputKeys.includes(key))
  const formKeys = [...inputKeys, ...extraKeys]

  const schemaMap = keyBy(schema, 'name')
  const inputsMap = keyBy(inputs, 'name')

  const extendedSchema = formKeys.map(key => {
    const customInput = inputsMap[key]
    const defaultInput = schemaMap[key]

    if (!defaultInput) {
      return { ...customInput }
    }

    const { type } = defaultInput
    const isObject = type === TYPE_OBJECT

    if (isObject && customInput) {
      const { schema: defaultSchema } = defaultInput
      const { schema: inputSchema = [] } = customInput

      customInput.schema = extendSchema(defaultSchema, inputSchema)
    }

    return {
      ...defaultInput,
      ...customInput
    }
  })

  return extendedSchema
}

export default extendSchema
