export const API = {
	url: 'https://norma.nomoreparties.space/api/ingredients',
	headers: {
		'Content-Type': 'aplication.json'
	}
};


export const responseCheck = res => {
	if (res.ok) {
		return res.json()
	} else {
		return Promise.reject(`Ошибка: code ${res.status}`)
	}
}

