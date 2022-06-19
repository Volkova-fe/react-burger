import React from 'react';
import PropTypes from 'prop-types';
import ingredientsCategoryStyles from './ingridients-category.module.css'
import IngridientsItem from '../ingridients-item/ingridients-item';
import { data } from '../../../utils/data';

const IngredientsCategory = (props) => {
	const category = data.filter((elem) => elem.type === props.type)
	return (
		<li className={`${ingredientsCategoryStyles.item} `} id={props.type}>
			<h2 className={`${ingredientsCategoryStyles.text} text text_type_main-medium pb-6 pt-2`}>{props.text}</h2>
			<ul className={ingredientsCategoryStyles.list}>
				{category.map((elem) => (
					<IngridientsItem key={elem._id} ingredient={elem} />
				))}
			</ul>
		</li>
	)
}

IngredientsCategory.propTypes = {
	type: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
}

export default IngredientsCategory;