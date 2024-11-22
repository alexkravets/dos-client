import PropTypes from "prop-types"

const SelectOptionShape = PropTypes.exact({
  label: PropTypes.oneOfType([ PropTypes.string, PropTypes.shape() ]).isRequired,
  value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
  disabled: PropTypes.bool,
})

export default SelectOptionShape
