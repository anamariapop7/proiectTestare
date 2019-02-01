import { LOGIN, LOGOUT } from './types';

export const login = (data) => dispatch => {
	console.error("data", data);
    localStorage.setItem('username', data.username);
    localStorage.setItem('password', data.password);
    localStorage.setItem('isLoggedIn', data.isLoggedIn);
    dispatch({
        type: LOGIN,
        payload: true,
    });

}
export const logout = (data) => dispatch => {
    localStorage.removeItem('username', data.username);
    localStorage.removeItem('password', data.password);
    localStorage.removeItem('isLoggedIn', data.isLoggedIn);
    dispatch({
        type: LOGOUT,
        payload: true,
    });

}