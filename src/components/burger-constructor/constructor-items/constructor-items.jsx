import React from 'react';
import PropTypes from 'prop-types';
import constructorItemStyles from './constructor-items.module.css'
import {
	DragIcon,
	ConstructorElement
}
	from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItems = (props) => {
	return (
		<li className={`${constructorItemStyles.item} pt-4`}>
			<DragIcon type="primary" />
			<ConstructorElement
				text={props.items.name}
				price={props.items.price}
				thumbnail={props.items.image}
			/>
		</li>
	)
}

ConstructorItems.prototype = {
	items: PropTypes.shape({
		text: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired
	}).isRequired
}

export default ConstructorItems;