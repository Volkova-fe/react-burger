import React, { FC } from 'react';
import ingredientsCategoryStyles from './ingredients-category.module.css'
import IngredientsItem from '../ingredients-item/ingredients-item';
import { TIngredient } from '../../../services/types/data';

type TIngredientsCategory = {
	ingredients: TIngredient[];
	type: string;
}

type TCategories = {
	[key: string]: string;
}

const IngredientsCategory: FC<TIngredientsCategory>= ({ ingredients, type }) => {
	const category = ingredients.filter((elem) => elem.type === type)
	const categories: TCategories = {
		'bun': 'Булки',
		'sauce': 'Соусы',
		'main': 'Начинки'
	}

	return (
		<li className={`${ingredientsCategoryStyles.item}`} id={type}>
			<h2 className={`${ingredientsCategoryStyles.text} text text_type_main-medium pb-6 pt-2`}>{categories[type]}</h2>
			<ul className={ingredientsCategoryStyles.list} >
				{category.map((elem) => (
					<li className={`${ingredientsCategoryStyles.item} `} key={elem._id} >
						<IngredientsItem key={elem._id} ingredient={elem} />
					</li>
				))}
			</ul>
		</li>
	)
}

export default IngredientsCategory;