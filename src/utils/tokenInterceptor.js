// this is an middleware interceptor for the token refresh in case if the access
// token is get expired it refresh the new access token .
// so basically it's like a gatekeeper for actions. It can inspect and modify actions before they reach the reducers.

import { refreshAccessToken } from '../Slices/userSlice';
import Cookies from 'js-cookie';

function tokenInterceptor(store) {
	return function (next) {
		return async function (action) {
			// Check if the action is an API request and not explicitly marked to skip interceptor
			
				const { token, tokenExpires } = store.getState().user?.user;
				const refreshToken = Cookies.get('refreshToken');
				console.log('sdfasdfsdfsdfsfsdf', token, tokenExpires, refreshToken);
				// Check if accessToken is expired or missing
				const now = Date.now() / 1000; // Convert milliseconds to seconds
				const isAccessTokenExpired = !token || tokenExpires < now;

				if (isAccessTokenExpired && refreshToken) {
					// Attempt to refresh the token using the existing thunk
					await store.dispatch(refreshAccessToken());
				}
			
            

			return next(action);
		};
	};
}

export default tokenInterceptor;
