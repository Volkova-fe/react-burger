import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerIngredientStyle from './burger-ingredients.module.css'
import IngredientsCategory from './ingredients-category/ingredients-category'
import { useSelector } from 'react-redux';

const BurgerIngredients = () => {
	const ingredients = useSelector(store => store.burgerIngredients.ingredients)

	const [current, setCurrent] = useState("bun");

	const [bunRef, bunInView] = useInView({
		threshold: 0.1
	});
	const [sauceRef, sauceInView] = useInView({
		threshold: 0.1
	});
	const [mainRef, mainInView] = useInView({
		threshold: 0.1
	});

	const onTabScroll = (type) => {
		setCurrent(type);
		const section = document.getElementById(type);
		section.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	const handleIngredientScroll = () => {
		switch (true) {
			case bunInView:
				setCurrent('bun');
				break;
			case sauceInView:
				setCurrent('sauce');
				break;
			case mainInView:
				setCurrent('main');
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleIngredientScroll();
	}, [bunInView, sauceInView, mainInView]);


	return (
		<section className={burgerIngredientStyle.section}>
			<h1 className={`${burgerIngredientStyle.title} text text_type_main-large`}>Соберите бургер</h1>
			<div className={`${burgerIngredientStyle.tab} pt-5`}>
				<a href='#bun' className={burgerIngredientStyle.link}>
					<Tab value="bun"
						active={current === "bun"}
						onClick={() => onTabScroll("bun")}
					>
						Булки
					</Tab>
				</a>
				<a href='#sauce' className={burgerIngredientStyle.link}>
					<Tab value="sauce"
						active={current === "sauce"}
						onClick={() => onTabScroll("sauce")}
					>
						Соусы
					</Tab>
				</a>
				<a href='#main' className={burgerIngredientStyle.link}>
					<Tab
						value="main"
						active={current === 'main'}
						onClick={() => onTabScroll("main")}
					>
						Начинки
					</Tab>
				</a>
			</div>

			<ul className={`${burgerIngredientStyle.list} pt-8`}>
				<div ref={bunRef}>
					<IngredientsCategory ingredients={ingredients} type='bun' />
				</div>
				<div ref={sauceRef}>
					<IngredientsCategory ingredients={ingredients} type='sauce' />
				</div>
				<div ref={mainRef}>
					<IngredientsCategory ingredients={ingredients} type='main' />
				</div>
			</ul>
		</section >
	)
}

export default BurgerIngredients