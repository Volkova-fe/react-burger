import { 
	TIngredientResponse, 
	TOrderDetailsResponse, 
	TUserLogoutResponse, 
	TUserResponce 
} from "../../services/types/data";
import { getCookie } from "../../utils/utils";

export const API = {
	url: 'https://norma.nomoreparties.space/api/',
	headers: {
		'Content-Type': 'aplication.json',
	},
}

export const checkResponse = <T>(res: Response): Promise<T> => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка: code ${res.status}`);
	}
}

export const orderDetailsRequest = async (productsId: string[]) => {
	return await fetch(`${API.url}orders`, {
		method: 'POST',
		body: JSON.stringify({
			ingredients: productsId
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token')
		},
	})
		.then (res => checkResponse<TOrderDetailsResponse>(res));
}

export const getIngredientData = async () => {
	return await fetch(`${API.url}ingredients`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	.then (res => checkResponse<TIngredientResponse>(res));
}

export const forgotPassRequest = async (email:string) => {
	return await fetch(`${API.url}password-reset`, {
		method: 'POST',
		body: JSON.stringify(
			email
		),
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const resetPassRequest = async (password: string, token: string | any) => {
	return await fetch(`${API.url}password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify(
			password,
			token
		),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const loginRequest = async (email: string, password: string) => {
	return await fetch(`${API.url}auth/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const resgisterUserRequest = async (email: string, password: string, name: string) => {
	return await fetch(`${API.url}auth/register`, {
		method: 'POST',
		body: JSON.stringify({
			email: email,
			password: password,
			name: name,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const logoutRequest = async () => {
	return await fetch(`${API.url}auth/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(res => checkResponse<TUserLogoutResponse>(res));
}

export const getUserRequest = async () => {
	return await fetch(`${API.url}auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const updateUserRequest = async (email: string, name: string, password: string) => {
	return await fetch(`${API.url}auth/user`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
		body: JSON.stringify({
			email: email,
			name: name,
			password: password,
		}),
	})
		.then(res => checkResponse<TUserResponce>(res));
}

export const updateTokenRequest = async () => {
	return await fetch(`${API.url}auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: localStorage.getItem('refreshToken'),
		}),
	})
		.then(res => checkResponse<TUserResponce>(res));
}