import PropTypes from "prop-types"

import ItemPropsShape from "./ItemPropsShape"
import InputPropsShape from "./InputPropsShape"
import SelectOptionShape from "./SelectOptionShape"


const InputShape = PropTypes.exact({
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape()
  ]),
  schema: PropTypes.array,
  options: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(SelectOptionShape),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  required: PropTypes.bool,
  operation: PropTypes.shape(),
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  itemProps: ItemPropsShape,
  component: PropTypes.func,
  inputProps: InputPropsShape,
  placeholder: PropTypes.string,
  componentProps: PropTypes.shape(),
  hasAutoComplete: PropTypes.bool,
  containerComponent: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  initialValue: PropTypes.any,
})

export default InputShape
