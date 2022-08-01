import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';

export const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [codeFromMail, setCodeFromMail] = useState('');

	const onChangeCodeMail = e => {
		setCodeFromMail(e.target.value)
	}

	const onChangePassword = e => {
		setPassword(e.target.value);
	}


	return (
		<div className={styles.container}>
			<h2 className={`${styles.title} text text_type_main-medium pb-6`}>Восстановление пароля</h2>
			<form className={styles.form}>
				<div className="pb-6">
					<PasswordInput
						placeholder={'Введите новый пароль'}
						onChange={onChangePassword}
						value={password}
						name={'password'}
						size="default"
					/>
				</div>
				<div className="pb-6">
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						onChange={onChangeCodeMail}
						value={codeFromMail}
						name={'codeFromMail'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
					/>
				</div>
				<Button type="primary" size="medium">
					Сохранить
				</Button>
			</form>
			<p className="text text_type_main-default text_color_inactive pt-20 pb-4">Вспомнили пароль?
				<Link className={styles.link} to='/login'>Войти</Link>
			</p>
		</div >)
}