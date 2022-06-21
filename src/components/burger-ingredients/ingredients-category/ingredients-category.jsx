import React from 'react';
import PropTypes from 'prop-types';
import ingredientsCategoryStyles from './ingredients-category.module.css'
import IngredientsItem from '../ingredients-item/ingredients-item';


const IngredientsCategory = ({ ingredients, type, onClick }) => {
	const category = ingredients.filter((elem) => elem.type === type)

	const categories = {
		'bun': 'Булки',
		'sauce': 'Соусы',
		'main': 'Начинки'
	}
	return (
		<li className={`${ingredientsCategoryStyles.item} `} id={ingredients.type}>
			<h2 className={`${ingredientsCategoryStyles.text} text text_type_main-medium pb-6 pt-2`}>{categories[type]}</h2>
			<ul className={ingredientsCategoryStyles.list}>
				{category.map((elem) => (
					<li className={`${ingredientsCategoryStyles.item} `} key={elem._id} onClick={() => onClick(elem)}>
						<IngredientsItem key={elem._id} ingredient={elem} onClick={onClick} />
					</li>
				))}
			</ul>
		</li>
	)
}

IngredientsCategory.propTypes = {
	type: PropTypes.string.isRequired,
	ingredients: PropTypes.array.isRequired,
	onClick: PropTypes.func.isRequired
}

export default IngredientsCategory;