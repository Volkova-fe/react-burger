import React from 'react';
import ingredientType from '../../../utils/types'
import ingredientsItemStyles from './ingredients-item.module.css'
import {
	CurrencyIcon,
	Counter
}
	from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientsItem = (props) => {
	return (
		<div className={`${ingredientsItemStyles.item} pl-4 mr-4`}>
			<img className={`${ingredientsItemStyles.image}`} src={props.ingredient.image} alt={props.ingredient.name} />
			<div className={`${ingredientsItemStyles.price} pt-1 pb-2`}>
				<p className='text text_type_digits-default pr-2'>{props.ingredient.price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className='text text_type_main-default pb-10'>{props.ingredient.name}</p>
			<Counter count={1} size="default" />
		</div>
	)
}

IngredientsItem.propTypes = {
	ingredient: ingredientType.isRequired
}

export default IngredientsItem;
