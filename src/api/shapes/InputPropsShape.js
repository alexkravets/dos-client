import PropTypes from "prop-types"

const InputPropsShape = PropTypes.shape({
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  hasNoneOption: PropTypes.bool,
  hasAutocomplete: PropTypes.bool,
})

export default InputPropsShape
