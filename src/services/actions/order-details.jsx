import { orderDetailsRequest } from "../../components/api/api";

import {
	CLOSE_ORDER_MODAL,
	ORDER_DETAILS_FAILED,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS
} from "../action-types";

export function closeOrderModal() {
	return {
		type: CLOSE_ORDER_MODAL,
	};
}

export function getOrderDetails(order) {
	return function (dispatch) {
		dispatch({
			type: ORDER_DETAILS_REQUEST
		});
		orderDetailsRequest(order)
			.then((res) => {
				dispatch({
					type: ORDER_DETAILS_SUCCESS,
					number: res.order.number
				});
			})
			.catch(() => {
				dispatch({
					type: ORDER_DETAILS_FAILED,
				});
			})
	};
}