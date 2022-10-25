import React, { FC } from 'react';
import styles from './ingredient-details.module.css'
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/hooks';

const IngredientDetails: FC = () => {
	const { id } = useParams<{ id: string }>();
	const ingredients = useSelector(store => store.burgerIngredients.ingredients);
	const ingredient = ingredients.find(ingredient => ingredient._id === id)

	return (
		<>
			{
				ingredient && (
					<div className={`${styles.container} pr-25 pl-25 pb-15 pt-15`}>
						<img className={`${styles.pic}`} src={ingredient.image_large} alt={ingredient.name} />
						<h3 className={`${styles.title} text text_type_main-medium pt-4`}>{ingredient.name}</h3>
						<ul className={`${styles.list} pt-8`}>
							<li className={`${styles.item}`}>
								<p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Калории,ккал</p>
								<p className={`${styles.text} text text_type_main-default text_color_inactive`}>{ingredient.calories}</p>
							</li>
							<li className={`${styles.item}`}>
								<p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Белки, г</p>
								<p className={`${styles.text} text text_type_main-default text_color_inactive`}>{ingredient.proteins}</p>
							</li>
							<li className={`${styles.item}`}>
								<p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Жиры, г</p>
								<p className={`${styles.text} text text_type_main-default text_color_inactive`}>{ingredient.fat}</p>
							</li>
							<li className={`${styles.item}`}>
								<p className={`${styles.text} text text_type_main-default text_color_inactive pb-2`}>Углеводы, г</p>
								<p className={`${styles.text} text text_type_main-default text_color_inactive`}>{ingredient.carbohydrates}</p>
							</li>
						</ul>
					</div>
				)
			}
		</>

	)
}

export default IngredientDetails;