import { ReactNode } from "react";
import { WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_ERROR, WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_SUCCESS, WS_AUTH_GET_ORDERS, WS_AUTH_SEND_ORDERS, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_ORDERS, WS_SEND_ORDERS } from "../action-types";

export type TIngredient = {
	calories: number;
	carbohydrates: number;
	fat: number;
	image: string;
	image_large: string;
	image_mobile: string;
	name: string;
	price: number;
	proteins: number;
	type: "bun" | "main" | "sauce";
	__v: number;
	_id: string;
	id?: string;
	count?: number;
}

export type TUser = {
	email: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}

export type TOrder = {
	createdAt: string;
	ingredients: TIngredient[];
	name: string;
	number: number;
	owner: TUser;
	price: number;
	status: string;
	updatedAt: string;
	_id: string;
}

export type TFeed = {
	createdAt: string;
	ingredients: string[];
	name: string;
	number: number;
	status: string;
	updatedAt: string;
	_id: string;
	}
	

export type TOrderDetailsResponse = {
	name: string
	order: TOrder;
	success: boolean;
}

export type TIngredientResponse = {
	data: Array<TIngredient>;
	success: boolean;
}

export type TUserResponce = {
	success: boolean;
	user: TUser;
	accessToken: string;
	refreshToken: string;
	message?: string;
}

export type TUserLogoutResponse = {
	message: string;
	success: boolean;
	refreshToken: string;
}

export type TFeedResponce = {
	success: boolean;
	total: number;
	totalToday: number;
	orders: Array<TFeed>;
	}
	

export type TLocation = {
	background: {
		pathname: string;
		search: string;
		hash: string;
		state: null;
		key: string;
	}
	from: string;
	state?: object;
};

export type TModal = { 
	title: string; 
	children: ReactNode; 
	onClickClose: () => void; 
}

export type TModalOverlay = { 
	onClickClose: () => void; 
}

export type TWsAuthSocketMiddlewareActions = {
	wsInit: typeof WS_AUTH_CONNECTION_START;
	wsSendMessage: typeof WS_AUTH_SEND_ORDERS;
	onOpen: typeof WS_AUTH_CONNECTION_SUCCESS;
	onClose: typeof WS_AUTH_CONNECTION_CLOSED;
	onError: typeof WS_AUTH_CONNECTION_ERROR;
	onMessage: typeof WS_AUTH_GET_ORDERS;
}

export type TWsSocketMiddlewareActions = {
	wsInit: typeof WS_CONNECTION_START;
	wsSendMessage: typeof WS_SEND_ORDERS;
	onOpen: typeof WS_CONNECTION_SUCCESS;
	onClose: typeof WS_CONNECTION_CLOSED;
	onError: typeof WS_CONNECTION_ERROR;
	onMessage: typeof WS_GET_ORDERS;
}