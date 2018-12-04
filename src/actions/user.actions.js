import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from '.';
import { history } from '../helpers/history';
import Notifications, { notify } from "react-notify-toast";


export const userActions = {
    login,
    logout,
    register,
    getAll,
};


function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                    console.log('You are logged in as ' + username)
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                    notify.show("Could not login with those credentials. Please retry", "error");
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        // debugger
        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration was successful'));
                    notify.show("Registration was successful. Please login", "success");
                    history.push('/login')
                },
                error => {
                    dispatch(failure(error.toString()));
                    notify.show("Could not signup with those credentials. Username may already be taken. Please retry", "error");
                    history.push("/signup");
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}