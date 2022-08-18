import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { resetPassword, setResetFormValue } from '../../services/actions/auth';
import { getCookie } from '../../utils/utils';
import styles from './reset-password.module.css';

export const ResetPassword = () => {
	const dispatch = useDispatch();
	const location = useLocation()
	const cookie = getCookie('token');
	const { password, code } = useSelector(state => state.auth.form);
	const { resetPassSuccess, forgetPassSuccess } = useSelector(state => state.auth);

	const onChange = e => {
		dispatch(setResetFormValue(e.target.name, e.target.value));
	}

	const onFormSubmit = e => {
		e.preventDefault();
		dispatch(resetPassword({ password, token: code }));
	}

	if (cookie) {
		return (<Redirect to={location.state?.from || '/'} />);
	}
	if (!forgetPassSuccess) {
		return <Redirect to={{ pathname: "/forgot-password" }} />;
	}

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={styles.form} onSubmit={onFormSubmit}>
				<div className="pb-6">
					<PasswordInput
						placeholder={'Введите новый пароль'}
						onChange={onChange}
						value={password}
						name={'password'}
						size="default"
					/>
				</div>
				<div className="pb-6">
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={onChange}
						value={code}
						name={'code'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>

				{code && password ?
					(<Button type="primary" size="medium">
						{!!resetPassSuccess
							? (<Redirect to={location.state?.from || '/profile'} />)
							: ''
						}
						Сохранить
					</Button>)
					: (<Button type="primary" size="medium" disabled>
						Сохранить
					</Button>)}
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={styles.link} to='/login'>Войти</Link>
			</p>
		</div >)
}