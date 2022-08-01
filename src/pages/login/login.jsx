import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onChangeEmail = e => {
		setEmail(e.target.value);
	}

	const onChangePassword = e => {
		setPassword(e.target.value);
	}

	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Вход</h2>
			<form className={styles.form}>
				<div className="pb-6">
					<EmailInput onChange={onChangeEmail} value={email} name={'email'} size="default" />
				</div>
				<div className="pb-6">
					<PasswordInput onChange={onChangePassword} value={password} name={'password'} size="default" />
				</div>
				<Button type="primary" size="medium">
					Войти
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вы — новый пользователь?
			<Link className={styles.link} to='/register'>Зарегистрироваться</Link>
			</p>
			<p className="text text_type_main-default text_color_inactive">Забыли пароль?
			<Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
			</p>
		</div >)
}