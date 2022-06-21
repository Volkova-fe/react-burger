import React from 'react';
import ingredientDetailstStyle from './ingredient-details.module.css'
import ingredientType from '../../utils/types'

const IngredientDetails = (props) => {
	return (
		<div className={`${ingredientDetailstStyle.container} pr-25 pl-25 pb-15`}>
			<img className={`${ingredientDetailstStyle.pic}`} src={props.item.image_large} alt={props.item.name} />
			<h3 className={`${ingredientDetailstStyle.title} text text_type_main-medium pt-4`}>{props.item.name}</h3>
			<ul className={`${ingredientDetailstStyle.list} pt-8`}>
				<li className={`${ingredientDetailstStyle.item}`}>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive pb-2`}>Калории,ккал</p>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive`}>{props.item.calories}</p>
				</li>
				<li className={`${ingredientDetailstStyle.item}`}>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive pb-2`}>Белки, г</p>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive`}>{props.item.proteins}</p>
				</li>
				<li className={`${ingredientDetailstStyle.item}`}>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive pb-2`}>Жиры, г</p>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive`}>{props.item.fat}</p>
				</li>
				<li className={`${ingredientDetailstStyle.item}`}>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive pb-2`}>Углеводы, г</p>
					<p className={`${ingredientDetailstStyle.text} text text_type_main-default text_color_inactive`}>{props.item.carbohydrates}</p>
				</li>
			</ul>
		</div>
	)
}

IngredientDetails.propTypes = {
	item: ingredientType.isRequired
}

export default IngredientDetails;