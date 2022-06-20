import PropTypes from 'prop-types';

const ingredientType = PropTypes.shape({
		image: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	});


export default ingredientType;