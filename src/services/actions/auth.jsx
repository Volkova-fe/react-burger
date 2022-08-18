import {
	forgotPassRequest,
	getUserRequest,
	loginRequest,
	logoutRequest,
	resetPassRequest,
	updateUserRequest,
	resgisterUserRequest,
	updateTokenRequest
} from "../../components/api/api";

import {
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	GET_USER_FAILED,
	GET_USER_REQUEST,
	GET_USER_SUCCESS,
	LOGIN_FORM_FAILED,
	LOGIN_FORM_REQUEST,
	LOGIN_FORM_SET_VALUE,
	LOGIN_FORM_SUCCESS,
	LOGOUT_FORM_FAILED,
	LOGOUT_FORM_REQUEST,
	LOGOUT_FORM_SUCCESS,
	PATCH_USER_FAILED,
	PATCH_USER_REQUEST,
	PATCH_USER_SUCCESS,
	REGISTER_FORM_FAILED,
	REGISTER_FORM_REQUEST,
	REGISTER_FORM_SET_VALUE,
	REGISTER_FORM_SUCCESS,
	RESET_FORM_SET_VALUE,
	RESET_PASSWORD_FAILED,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	UPDATE_TOKEN_FAILED,
	UPDATE_TOKEN_REQUEST,
	UPDATE_TOKEN_SUCCESS
} from "../action-types";

import { deleteCookie, setCookie } from "../../utils/utils";

export function forgotPassword(email) {
	return function (dispatch) {
		dispatch({
			type: FORGOT_PASSWORD_REQUEST,
		});
		forgotPassRequest(email)
			.then((res) => {
				dispatch({
					type: FORGOT_PASSWORD_SUCCESS,
					message: res.message,
				});
			})
			.catch(() => {
				dispatch({
					type: FORGOT_PASSWORD_FAILED,
				});
			})
	};
}

export const setResetFormValue = (field, value) => ({
	type: RESET_FORM_SET_VALUE,
	field,
	value,
});

export function resetPassword(password, token) {
	return function (dispatch) {
		dispatch({
			type: RESET_PASSWORD_REQUEST,
		});
		resetPassRequest(password, token)
			.then((res) => {
				dispatch({
					type: RESET_PASSWORD_SUCCESS,
				});
			})
			.catch(() => {
				dispatch({
					type: RESET_PASSWORD_FAILED,
				});
			})
	};
}

export const setLoginFormValue = (field, value) => ({
	type: LOGIN_FORM_SET_VALUE,
	field,
	value,
});

export function singIn(email, password) {
	return function (dispatch) {
		dispatch({
			type: LOGIN_FORM_REQUEST,
		});
		loginRequest(email, password)
			.then(res => {
				const accessToken = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				setCookie('token', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: LOGIN_FORM_SUCCESS,
					user: res.user,
				});
			})
			.catch(() => {
				dispatch({
					type: LOGIN_FORM_FAILED,
				});
			})
	};
}

export function singOut() {
	return function (dispatch) {
		dispatch({
			type: LOGOUT_FORM_REQUEST,
		});
		logoutRequest()
			.then(res => {
				const refreshToken = res.refreshToken;
				deleteCookie('token');
				localStorage.removeItem('refreshToken', refreshToken);
				if (res && res.success) {
					dispatch({
						type: LOGOUT_FORM_SUCCESS,
					});
				} else {
					dispatch({ type: LOGOUT_FORM_FAILED });
				}
			})
			.catch(() => {
				dispatch({
					type: LOGOUT_FORM_FAILED,
				});
			})
	};
}

export const setRegisterFormValue = (field, value) => ({
	type: REGISTER_FORM_SET_VALUE,
	field,
	value,
});

export function registerUser(email, password, name) {
	return function (dispatch) {
		dispatch({
			type: REGISTER_FORM_REQUEST,
		});
		resgisterUserRequest(email, password, name)
			.then(res => {
				const accessToken = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				setCookie('token', accessToken);
				localStorage.setItem('refreshToken', refreshToken);
				return res;
			})
			.then((res) => {
				dispatch({
					type: REGISTER_FORM_SUCCESS,
					user: res,
				});
			})
			.catch(() => {
				dispatch({
					type: REGISTER_FORM_FAILED,
				});
			})
	};
}

export function getUser() {
	return function (dispatch) {
		dispatch({
			type: GET_USER_REQUEST,
		});
		getUserRequest()
			.then((res) => {
				dispatch({
					type: GET_USER_SUCCESS,
					user: res.user,
				});
			})
			.catch(() => {
				dispatch({
					type: GET_USER_FAILED,
				});
			})
	};
}

export function updateUser(email, name, password) {
	return function (dispatch) {
		dispatch({
			type: PATCH_USER_REQUEST,
		});
		updateUserRequest(email, name, password)
			.then((res) => {
				dispatch({
					type: PATCH_USER_SUCCESS,
					user: res,
				});
			})
			.catch(() => {
				dispatch({
					type: PATCH_USER_FAILED,
				});
			})
	};
}

export function updateToken() {
	return function (dispatch) {
		dispatch({ type: UPDATE_TOKEN_REQUEST })
		updateTokenRequest()
			.then((res) => {
				const authToken = res.accessToken.split('Bearer ')[1];
				const refreshToken = res.refreshToken;
				setCookie('token', authToken);
				localStorage.setItem('refreshToken', refreshToken);
				dispatch({
					type: UPDATE_TOKEN_SUCCESS,
				})
			})
			.catch((err) => {
				dispatch({
					type: UPDATE_TOKEN_FAILED,
				});
			});
	}
}