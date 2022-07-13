import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from './burger-ingredients.module.css'
import IngredientsCategory from './ingredients-category/ingredients-category'

const BurgerIngredients = ({ ingredients, onClick }) => {
	const [current, setCurrent] = useState('bun');

	return (
		<section className={burgerIngredientStyle.section}>
			<h1 className={`${burgerIngredientStyle.title} text text_type_main-large`}>Соберите бургер</h1>
			<div className={`${burgerIngredientStyle.tab} pt-5`}>
				<a href='#bun' className={burgerIngredientStyle.link}>
					<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
						Булки
					</Tab>
				</a>
				<a href='#sauce' className={burgerIngredientStyle.link}>
					<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
						Соусы
					</Tab>
				</a>
				<a href='#main' className={burgerIngredientStyle.link}>
					<Tab value="main" active={current === 'main'} onClick={setCurrent}>
						Начинки
					</Tab>
				</a>
			</div>

			<ul className={`${burgerIngredientStyle.list} pt-8`}>
				<IngredientsCategory ingredients={ingredients} type='bun' onClick={onClick} />
				<IngredientsCategory ingredients={ingredients} type='sauce' onClick={onClick} />
				<IngredientsCategory ingredients={ingredients} type='main' onClick={onClick} />
			</ul>
		</section >
	)
}

BurgerIngredients.propTypes = {
	ingredients: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
}

export default BurgerIngredients