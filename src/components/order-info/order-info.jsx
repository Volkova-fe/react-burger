import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { OrdersInfoDetails } from './order-info-details/order-info-details';
import styles from './order-info.module.css';
import uniqid from 'uniqid';
import { getUser } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsActions';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/actions/wsAuthActions';

export const OrdersInfo = () => {
	let { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	let match = useRouteMatch()
	const isProfile = '/profile/orders/:id';
	const isFeed = '/feed/:id';
	const allOrders = useSelector(store => store.wsFeed.orders);
	const authOrders = useSelector(store => store.wsAuthFeed.orders);
	const ingredients = useSelector(store => store.burgerIngredients.ingredients)

	let orders = match.path === isProfile ? authOrders : allOrders;
	console.log(orders)
	let order = orders.find((order) => order._id === id);
	console.log(authOrders)

	const orderIngredientsData = useMemo(() => {
		return order?.ingredients.map((id) => {
			return ingredients?.find((item) => {
				return id === item._id
			})
		})
	}, [order?.ingredients, ingredients])

	console.log(orderIngredientsData)
	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData?.reduce((sum, item) => {
			if (item.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])


	return (
		<>
			{
				order && (
					<div className={styles.container}>
						<p>#{order.number}</p>
						<h2>{order.name}</h2>
						{!!order.status &&
							<p className={`${styles.status} text text_type_main-default`}>
								{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
							</p>}
						<h3>Состав:</h3>
						<ul>
							<OrdersInfoDetails details={orderIngredientsData} key={id} />
						</ul>
						<div>
							<p>{order.createdAt}</p>
							<div className={styles.price}>
								<p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
								<CurrencyIcon type="primary" key={uniqid()} />
							</div>
						</div>
					</div >
				)}
		</>
	)
}