import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, ReactNode, useMemo } from 'react';
import uniqid from 'uniqid';
import { StackedImage } from '../../orders/orders-card/stacked-image/stacked-image';
import styles from './order-info-details.module.css';
import { useSelector } from '../../../services/hooks';
import { TIngredient } from '../../../services/types/data';

type TOrdersInfoDetails = {
	details: TIngredient[];
}

export const OrdersInfoDetails: FC<TOrdersInfoDetails> = ({ details }) => {
	const ingredients = useSelector(store => store.burgerIngredients.ingredients);

	const count = (elem: object) => {
		let count = details?.filter((item) => {
			return item === elem;
		}).length
		return count
	}

	const orderIngredient = useMemo(() => {
		return details?.map((elem) => {
			return ingredients?.find((item) => {
				return elem._id === item._id
			})
		})
	}, [details, ingredients]);


	return (
		<div className={styles.container}>
			{orderIngredient && [...new Set(orderIngredient)].map((item) => {
				return (
					<li className={`${styles.item} pb-3`} key={uniqid()}>
						{item && (
							<>
								<div className={styles.info}>
									<StackedImage image={item.image} alt={item.name} key={uniqid()} />
									<p className={`${styles.text} text text_type_main-default pl-4`}>{item.name}</p>
								</div>
								<div className={styles.price}>
									<p className='text text_type_digits-default pr-2'> {count(item)} x {item.type === 'bun' ? item.price * 2 : item.price}</p>
									<CurrencyIcon type="primary" key={uniqid()} />
								</div>
							</>
						)}
					</li>
				)
			})}
		</div>
	)
}
