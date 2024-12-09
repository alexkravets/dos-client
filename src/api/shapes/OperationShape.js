import PropTypes from "prop-types"

import InputShape from "./InputShape"

const HTTP_METHODS = ["GET", "DELETE", "PATCH", "POST"]


const OperationShape = PropTypes.exact({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  schema: PropTypes.arrayOf(InputShape),
  isIndex: PropTypes.bool.isRequired,
  isCreate: PropTypes.bool.isRequired,
  isUpdate: PropTypes.bool.isRequired,
  httpMethod: PropTypes.oneOf(HTTP_METHODS).isRequired,
  getSchema: PropTypes.func,
  getIndexItemSchema: PropTypes.func,
  getAttributeSchema: PropTypes.func,
})

export default OperationShape
