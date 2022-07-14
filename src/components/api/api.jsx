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
