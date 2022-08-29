import { FC } from 'react';
import { BrowserRouterProps, Redirect, Route, useLocation } from 'react-router-dom';
import { TLocation } from '../../services/types/data';
import { getCookie } from '../../utils/utils';

export const ProtectedRoute: FC<BrowserRouterProps> = ({ children, ...rest }) => {
	const cookie = getCookie('token');
	const location = useLocation<TLocation>();

	return (
		<Route
			{...rest}
			render={() =>
				cookie ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
} 