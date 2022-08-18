import { getCookie } from "../../utils/utils";

export const API = {
	url: 'https://norma.nomoreparties.space/api/',
	headers: {
		'Content-Type': 'aplication.json',
	},
}

export const checkResponse = res => {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject(`Ошибка: code ${res.status}`);
	}
}

export const orderDetailsRequest = async (productsId) => {
	const res = await fetch(`${API.url}orders`, {
		method: 'POST',
		body: JSON.stringify({
			ingredients: productsId
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token')
		},
	})
	return checkResponse(res);
}

export const getIngredientData = async () => {
	const res = await fetch(`${API.url}ingredients`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return checkResponse(res);
}

export const forgotPassRequest = async email => {
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
		.then(checkResponse);
}

export const resetPassRequest = async (password, token) => {
	return await fetch(`${API.url}password-reset/reset`, {
		method: 'POST',
		body: JSON.stringify(
			password,
			token,
		),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(checkResponse);
}

export const loginRequest = async (email, password) => {
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
		.then(checkResponse);
}

export const resgisterUserRequest = async (email, password, name) => {
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
		.then(checkResponse);
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
		.then(checkResponse);
}

export const getUserRequest = async () => {
	return await fetch(`${API.url}auth/user`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + getCookie('token'),
		},
	})
		.then(checkResponse);
}

export const updateUserRequest = async (email, name, password) => {
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
		.then(checkResponse);
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
		.then(checkResponse);
}