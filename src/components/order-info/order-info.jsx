import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router-dom';
import { OrdersInfoDetails } from './order-info-details/order-info-details';
import styles from './order-info.module.css';
import uniqid from 'uniqid';
import { useDispatch } from 'react-redux';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/actions/wsActions';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/actions/wsAuthActions';

export const OrdersInfo = () => {
	const dispatch = useDispatch();

	let { id } = useParams();
	let match = useRouteMatch();
	const isProfile = '/profile/orders/:id';
	const isFeed = '/feed/:id';

	const allOrders = useSelector(store => store.wsFeed.orders);
	const authOrders = useSelector(store => store.wsAuthFeed.orders);
	const ingredients = useSelector(store => store.burgerIngredients.ingredients);

	let orders = match.path === isProfile ? authOrders : allOrders;
	let order = orders.find((order) => order._id === id);


	const orderIngredientsData = useMemo(() => {
		return order?.ingredients.map((id) => {
			return ingredients?.find((item) => {
				return id === item._id
			})
		})
	}, [order?.ingredients, ingredients])

	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData?.reduce((sum, item) => {
			if (item?.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])

	useEffect(() => {
		if (!order) {
			if (match.path === isProfile) {
				dispatch(wsAuthConnectionOpen());
			}
			if (match.path === isFeed) {
				dispatch(wsConnectionOpen());
			}
		}
		return () => {
			if (match.path === isProfile) {
				dispatch(wsAuthConnectionClosed());
			}
			if (match.path === isFeed) {
				dispatch(wsConnectionClosed());
			}
		}
	}, [dispatch, order, match.path, match.url]);

	return (
		<>
			{
				order && (
					<div className={styles.container}>
						<p className='text text_type_digits-default'>#{order.number}</p>
						<h2 className={`${styles.name} text text_type_main-medium pt-10`}>{order.name}</h2>
						{!!order.status &&
							<p className={`${styles.status} text text_type_main-default pt-3`}>
								{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
							</p>}
						<h3 className={`${styles.order} text text_type_main-medium pt-15`}>Состав:</h3>
						<ul className={`${styles.list}`}>
							<OrdersInfoDetails details={orderIngredientsData} key={id} />
						</ul>
						<div className={`${styles.total} pb-10`}>
							<p className="text text_type_main-default text_color_inactive">{order.createdAt}</p>
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