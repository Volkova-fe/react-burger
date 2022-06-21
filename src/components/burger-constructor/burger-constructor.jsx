import React from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types'
import {
	ConstructorElement,
	CurrencyIcon,
	Button,
}
	from '@ya.praktikum/react-developer-burger-ui-components'
import ConstructorItems from './constructor-items/constructor-items'
import burgerConstructorStyle from './burger-constructor.module.css';

const BurgerConstructor = ({ ingredients, onClick }) => {
	return (
		<section className={`${burgerConstructorStyle.section} pl-10 pt-25`}>
			<div className={`${burgerConstructorStyle.container} pr-2`}>
				<ConstructorElement
					type="top"
					isLocked={true}
					text="Краторная булка N-200i (верх)"
					price={200}
					thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
				/>
				<ul className={`${burgerConstructorStyle.list} pr-2`}>
					{ingredients.map((elem) => {
						if (elem.type === 'sauce' || elem.type === 'main') {
							return <ConstructorItems key={elem._id} items={elem} />
						}
					})}
				</ul>

				<ConstructorElement
					type="bottom"
					isLocked={true}
					text="Краторная булка N-200i (низ)"
					price={200}
					thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
				/>
			</div>
			<div className={`${burgerConstructorStyle.order} pt-10 pr-5`}>
				<div className={`${burgerConstructorStyle.count_result} pr-10`}>
					<p className='text text_type_digits-medium pr-2'>15000</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large" onClick={onClick}>
					Оформить заказ
				</Button>
			</div>
		</section>
	)
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
	onClick: PropTypes.func.isRequired
}

export default BurgerConstructor