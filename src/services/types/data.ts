import { ReactNode } from "react";

export type TIngredient = {
	type: string;
	_id: string;
	image: string;
	price: number;
	name: string
	proteins: number
	fat: number;
	carbohydrates: number;
	calories: number;
	image_large: string;
	id?: string;
}


export type TOrderDetailsResponse = {
	name: string;
	order: {
		createdAt: string;
		ingtedients: Array<TIngredient>;
		name: string;
		number: number;
		owner: object;
		price: number;
		status: string;
		updatedAt: string;
		_id: string;
	}
	success: boolean;
}

export type TIngredientResponse = {
	data: Array<TIngredient>;
	success: boolean;
}

export type TUser = {
	success: boolean;
	user: {
		email: string;
		name: string;
		password: string;
	};
	accessToken: string;
	refreshToken: string;
};

export type TUserLogoutResponse = {
	message: string;
	success: boolean;
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