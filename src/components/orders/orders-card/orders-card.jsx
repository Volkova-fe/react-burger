import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import styles from './orders-card.module.css';
import { useSelector } from 'react-redux';
import uniqid from 'uniqid';
import { StackedImage } from './stacked-image/stacked-image';


export const OrdersCard = ({ order }) => {
	const ingredients = useSelector(store => store.burgerIngredients.ingredients)
	const { createdAt, number, name, status } = order;

	const MAX_LENGTH = order.ingredients.length;
	const hideIngredients = MAX_LENGTH - 6

	const orderIngredientsData = useMemo(() => {
		return order.ingredients.map((id) => {
			return ingredients?.find((item) => {
				return id === item._id
			})
		})
	}, [order.ingredients, ingredients])


	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData.reduce((sum, item) => {
			if (item.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])


	const dataCreate = new Date(createdAt).toLocaleString()
	const ItemId = uniqid();

	return (
		<div className={styles.container}>
			<div className={styles.orderid}>
				<p className="text text_type_digits-default">#{number}</p>
				<p className="text text_type_main-default text_color_inactive">{dataCreate}</p>
			</div>
			<div className={styles.info}>
				<h2 className={`${styles.text} text text_type_main-medium`}>{name}</h2>
				{!!status &&
					<p className={`text text_type_main-default`}>
						{status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится' : status === 'created' ? 'Создан' : 'Выполнен'}
					</p>}
			</div>
			<div className={styles.price}>
				<ul className={styles.list}>
					{orderIngredientsData && MAX_LENGTH <= 5 && orderIngredientsData.map((item, index) => {
						return (item ? (
							<li className={styles.items} key={ItemId + index}>
								<StackedImage image={item.image} alt={item.name} key={ItemId + index} />
							</li>
						)
							: '')
					})}
					{orderIngredientsData && MAX_LENGTH >= 6 && orderIngredientsData.slice(0, 5).map((item, index) => {
						return (item ? (
							<li className={styles.items} key={ItemId + index}>
								<StackedImage image={item.image} alt={item.name} key={ItemId + index} />
							</li>
						)
							: '')
					})}
					{orderIngredientsData && MAX_LENGTH > 6 && orderIngredientsData.slice(5, 6).map((item, index) => {
						return (item ? (
							<>
								<li className={styles.items} key={ItemId + index}>
									<p className={`text text_type_main-default ${styles.hideText}`}>{`+${hideIngredients}`}</p>
									<div className={styles.hidePic}>
										<StackedImage image={item.image} alt={item.name} key={ItemId + index} />
									</div>
								</li>
							</>
						)
							: '')
					})}
				</ul>
				<div className={styles.price}>
					<p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
			</div>
		</div >)
}