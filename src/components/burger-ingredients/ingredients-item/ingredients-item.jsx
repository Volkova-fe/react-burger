import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import ingredientType from '../../../utils/types'
import ingredientsItemStyles from './ingredients-item.module.css'
import {
	CurrencyIcon,
	Counter
}
	from '@ya.praktikum/react-developer-burger-ui-components';
import { openIngredientModal } from '../../../services/actions/ingredient-details';

const IngredientsItem = ({ ingredient }) => {
	const { bun, items } = useSelector((state) => state.burgerConstructor);
	const dispatch = useDispatch();
	const { image, name, price } = ingredient;

	const [{ opacity }, dragRef] = useDrag({
		type: "ingredients",
		item: { ingredient },
		collect: monitor => ({
			opacity: monitor.isDragging() ? 0.5 : 1
		})
	});

	const counter = useMemo(
		() =>
			(count = 0) => {
				for (let { _id } of items)
					if (_id === ingredient._id) count++;

				if (bun && bun._id === ingredient._id) return 2;
				return count;
			},
		[bun, items, ingredient._id]
	);

	const handleOpenIngredientDetailsModal = (ingredient) => {
		dispatch(openIngredientModal(ingredient));
	};

	return (
		<div
			className={`${ingredientsItemStyles.item} pl-4 mr-4`}
			onClick={() => handleOpenIngredientDetailsModal(ingredient)}
			style={{ opacity }}
			ref={dragRef}
		>
			<img className={`${ingredientsItemStyles.image}`} src={image} alt={name} />
			<div className={`${ingredientsItemStyles.price} pt-1 pb-2`}>
				<p className='text text_type_digits-default pr-2'>{price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<p className='text text_type_main-default pb-10'>{name}</p>
			{counter() > 0 && <Counter count={counter()} size="default" />}
		</div>
	)
}

IngredientsItem.propTypes = {
	ingredient: ingredientType.isRequired
}

export default IngredientsItem;
