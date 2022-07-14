import React, { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
}
	from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItems from './constructor-items/constructor-items'
import burgerConstructorStyle from './burger-constructor.module.css';
import { DataContext } from '../../services/appContext';

const BurgerConstructor = ({ onClick, getOrder }) => {
	const { data } = useContext(DataContext);
	const [total, setTotal] = useState(0);
	let burgerId = useMemo(() => data.map((item) => item._id), [data])

	const bunItem = useMemo(
		() => data.find((item) => item.type === 'bun'), [data])

	const filling = useMemo(
		() => data.filter((item) => item.type !== 'bun'), [data])

	useEffect(() => {
		const totalPrice = filling.reduce((sum, item) => sum + item.price, bunItem ? (bunItem.price * 2) : 0)
		setTotal(totalPrice)
	}, [bunItem, filling])

	return (
		<section className={`${burgerConstructorStyle.section} pl-10 pt-25`}>
			<div className={`${burgerConstructorStyle.container} pr-2`}>
				{bunItem && <ConstructorElement
					type="top"
					isLocked={true}
					text={bunItem.name + '(верх)'}
					price={bunItem.price}
					thumbnail={bunItem.image}
				/>}
				<ul className={`${burgerConstructorStyle.list} pr-2`}>
					{data.map((elem) => {
						if (elem.type === 'sauce' || elem.type === 'main') {
							return <ConstructorItems key={elem._id} items={elem} />
						}
					})}
				</ul>

				{bunItem && <ConstructorElement
					type="bottom"
					isLocked={true}
					text={bunItem.name + '(низ)'}
					price={bunItem.price}
					thumbnail={bunItem.image}
				/>}
			</div>
			<div className={`${burgerConstructorStyle.order} pt-10 pr-5`}>
				<div className={`${burgerConstructorStyle.count_result} pr-10`}>
					<p className='text text_type_digits-medium pr-2'>{total}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large" onClick={() => {
					onClick();
					getOrder(burgerId)
				}}>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

BurgerConstructor.propTypes = {
	onClick: PropTypes.func.isRequired,
	getOrder: PropTypes.func.isRequired
}

export default BurgerConstructor