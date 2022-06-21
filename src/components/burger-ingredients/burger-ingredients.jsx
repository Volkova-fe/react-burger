import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngridientStyle from './burger-ingredients.module.css'
import IngredientsCategory from './ingridients-category/ingridients-category'

const BurgerIngredients = ({ ingridients, onClick }) => {
	const [current, setCurrent] = React.useState('bun')

	return (
		<section className={burgerIngridientStyle.section}>
			<h1 className={`${burgerIngridientStyle.title} text text_type_main-large`}>Соберите бургер</h1>
			<div className={`${burgerIngridientStyle.tab} pt-5`}>
				<a href='#bun' className={burgerIngridientStyle.link}>
					<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
						Булки
					</Tab>
				</a>
				<a href='#sauce' className={burgerIngridientStyle.link}>
					<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
						Соусы
					</Tab>
				</a>
				<a href='#main' className={burgerIngridientStyle.link}>
					<Tab value="main" active={current === 'main'} onClick={setCurrent}>
						Начинки
					</Tab>
				</a>
			</div>

			<ul className={`${burgerIngridientStyle.list} pt-8`}>
				<IngredientsCategory ingridients={ingridients} type='bun' onClick={onClick} />
				<IngredientsCategory ingridients={ingridients} type='sauce' onClick={onClick} />
				<IngredientsCategory ingridients={ingridients} type='main' onClick={onClick} />
			</ul>
		</section >
	)
}

BurgerIngredients.propTypes = {
	onclick: PropTypes.func
}

export default BurgerIngredients