import React, { FC, useMemo } from 'react';
import { useSelector } from '../../../services/hooks';
import { useDrag } from 'react-dnd';
import styles from './ingredients-item.module.css'
import {
	CurrencyIcon,
	Counter
}
	from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient, TLocation } from '../../../services/types/data';

type TIngredientsItem = {
	ingredient: TIngredient;
}

const IngredientsItem: FC<TIngredientsItem> = ({ ingredient }) => {
	const location = useLocation<TLocation>();

	const { bun, items } = useSelector((state) => state.burgerConstructor);
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

	return (
		<Link
			to={{ pathname: `/ingredients/${ingredient._id}`, state: { background: location } }}
			className={`${styles.link}`}
		>
			<div
				className={`${styles.item} pl-4 mr-4`}
				style={{ opacity }}
				ref={dragRef}
			>
				<img className={`${styles.image}`} src={image} alt={name} />
				<div className={`${styles.price} pt-1 pb-2`}>
					<p className='text text_type_digits-default pr-2'>{price}</p>
					<CurrencyIcon type="primary" />
				</div>
				<p className='text text_type_main-default pb-10'>{name}</p>
				{counter() > 0 && <Counter count={counter()} size="default" />}
			</div>
		</Link>
	)
}

export default IngredientsItem;
