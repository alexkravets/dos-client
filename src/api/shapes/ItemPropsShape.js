import PropTypes from "prop-types"

const ItemPropsShape = PropTypes.shape({
  name: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])),
    PropTypes.string
  ]),
})

export default ItemPropsShape
