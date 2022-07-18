export const API = {
	url: 'https://norma.nomoreparties.space/api/',
	headers: {
		'Content-Type': 'aplication.json'
	}
};

export const checkResponse = res => {
	if (res.ok) {
		return res.json()
	} else {
		return Promise.reject(`Ошибка: code ${res.status}`)
	}
}

export const orderDetailsRequest = async (productsId) => {
	const res = await fetch(`${API.url}orders`, {
		method: 'POST',
		body: JSON.stringify({
			ingredients: productsId
		}),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return checkResponse(res);
}

export const getIngredientData = async () => {
	const res = await fetch(`${API.url}ingredients`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	return checkResponse(res);
}
