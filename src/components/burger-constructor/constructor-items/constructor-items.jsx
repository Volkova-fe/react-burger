import React from 'react';
import ingredientType from '../../../utils/types'
import constructorItemStyles from './constructor-items.module.css'
import {
	DragIcon,
	ConstructorElement,
}
	from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorItems = (data) => {

	return (
		<>
			<li className={`${constructorItemStyles.item} pt-4 pr-3`}>
				<DragIcon type="primary" />
				<ConstructorElement
					text={data.items.name}
					price={data.items.price}
					thumbnail={data.items.image}
				/>
			</li>
		</>
	)
}

ConstructorItems.propTypes = {
	items: ingredientType.isRequired
}

export default ConstructorItems;