import { getIngredientData } from "../../components/api/api";

import {
	BURGER_INGREDIENTS_FAILED,
	BURGER_INGREDIENTS_REQUEST,
	BURGER_INGREDIENTS_SUCCESS
} from "../action-types";

export function getBurgerIngredients() {
	return function (dispatch) {
		dispatch({
			type: BURGER_INGREDIENTS_REQUEST
		});
		getIngredientData()
			.then((res) => {
				dispatch({
					type: BURGER_INGREDIENTS_SUCCESS,
					ingredients: res.data,
				});
			})
			.catch(() => {
				dispatch({
					type: BURGER_INGREDIENTS_FAILED,
				});
			})
	};
}