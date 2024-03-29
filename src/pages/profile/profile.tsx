import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { NavLink, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { OrdersInfo } from '../../components/order-info/order-info';
import { getUser, singOut, updateUser } from '../../services/actions/auth';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/actions/wsAuthActions';
import { OrderHistory } from './order-history/order-history';
import styles from './profile.module.css';
import { TLocation } from '../../services/types/data';

export const Profile: FC = () => {
	const dispatch = useDispatch();
	const location = useLocation<TLocation>();
	const matchOrderDetails = !!useRouteMatch({ path: '/profile/orders/:id' });
	const background = location.state?.background;
	const { email, name } = useSelector(state => state.auth.user);

	useEffect(() => {
		dispatch(getUser());
		dispatch(wsAuthConnectionOpen());
		return () => {
			dispatch(wsAuthConnectionClosed())
		}
	}, [dispatch]);

	const [form, setForm] = useState({
		email: '',
		name: '',
		password: '',
	});

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(updateUser(form.email, form.name, form.password));
	};

	function handleSingOut() {
		dispatch(singOut());
	};

	useEffect(() => {
		setForm({
			email: email,
			name: name,
			password: ''
		})
	}, [email, name])

	const onResetForm = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setForm({
			email: '',
			name: '',
			password: '',
		})
	}



	return (
		<div className={`${styles.container} pt-30`}>
			{!matchOrderDetails && <nav className={`${styles.nav} pr-15`}>
				<ul className={`${styles.list}`}>
					<li className={`${styles.item}`}>
						<NavLink
							to='/profile'
							exact
							className={`${styles.link} text text_type_main-medium text_color_inactive`}
							activeClassName={`${styles.linkActive} text text_type_main-medium`}
						>
							Профиль
						</NavLink>
					</li>
					<li className={`${styles.item}`}>
						<NavLink
							to='/profile/orders'
							exact
							className={`${styles.link} text text_type_main-medium text_color_inactive`}
							activeClassName={`${styles.linkActive} text text_type_main-medium`}
						>
							История заказов
						</NavLink>
					</li>
					<li className={`${styles.item}`}>
						<NavLink
							to='/login'
							exact
							className={`${styles.link} text text_type_main-medium text_color_inactive`}
							activeClassName={`${styles.linkActive} text text_type_main-medium`}
							onClick={handleSingOut}
						>
							Выход
						</NavLink>
					</li>
				</ul>
				<p className={`${styles.text} text text_type_main-default text_color_inactive pt-20 pb-4`}>
					В этом разделе вы можете изменить свои персональные данные
				</p>
			</nav>}
			<Switch location={background || location}>
				<Route path="/profile/orders" exact>
					<OrderHistory />
				</Route>
				<Route path='/profile/orders/:id' exact>
					<OrdersInfo />
				</Route>
				<Route exact path="/profile">
					<form className={styles.form} onSubmit={onSubmit}>
						<div className="pb-6">
							<Input
								type={'text'}
								placeholder={'Имя'}
								onChange={onChange}
								icon={'EditIcon'}
								value={name}
								name={'name'}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
							/>
						</div>
						<div className="pb-6">
							<Input
								type={'email'}
								placeholder={'Логин'}
								onChange={onChange}
								icon={'EditIcon'}
								value={email}
								name={'email'}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
							/>
						</div>
						<div className="pb-6">
							<Input
								type={'password'}
								placeholder={'Пароль'}
								onChange={onChange}
								icon={'EditIcon'}
								value={form.password}
								name={'password'}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
							/>
						</div>
						<Button type="secondary" size="medium" onClick={() => onResetForm}>
							Oтмена
						</Button>
						<Button disabled={!form.password} type="primary" size="medium">
							Сохранить
						</Button>
					</form>
				</Route>
			</Switch>
		</div >
	)
}