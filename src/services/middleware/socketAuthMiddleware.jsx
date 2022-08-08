import { getCookie } from "../../utils/utils";

export const socketAuthMiddleware = (wsUrl, wsActions) => {
	return store => {
		let socket = null;

		return next => action => {
			const { dispatch } = store;
			const { type, payload } = action;
			const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;
			const accessToken = getCookie('token')
			if (type === wsInit && accessToken) {
				socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
			}
			if (socket) {
				socket.onopen = event => {
					dispatch({ type: onOpen, payload: event });
				};

				socket.onerror = event => {
					dispatch({ type: onError, payload: event });
				};

				socket.onmessage = event => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { success, ...restParsedData } = parsedData;

					dispatch({ type: onMessage, payload: restParsedData });
				};

				socket.onclose = event => {
					dispatch({ type: onClose, payload: event });
				};

				if (type === wsSendMessage) {
					const orders = { ...payload };
					socket.send(JSON.stringify(orders));
				}
			}

			next(action);
		};
	};
};