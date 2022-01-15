import userAuth from '../../interfaces/models/userAuth'

export const ATTEMPT_LOGIN = '@auth/ATTEMPT_LOGIN'
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS'
export const LOGIN_FAILED = '@auth/LOGIN_FAILED'

export const SAVE_USER = '@auth/SAVE_USER'

export const ATTEMPT_LOGOUT = '@auth/ATTEMPT_LOGOUT'
export const LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS'
export const LOGOUT_FAILED = '@auth/LOGOUT_SUCCESS'


export const saveUser = (payload: { user: userAuth, isAuthenticated: boolean, isLoading: boolean }) => {
    return {
        type: SAVE_USER,
        payload
    }
}

export const login = (payload: userAuth) => {
    return {
        type: ATTEMPT_LOGIN,
        payload
    }
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

export const loginFailed = () => {
    return {
        type: LOGIN_FAILED
    }
}

export const logoutAttempt = () => {
    return {
        type: ATTEMPT_LOGOUT,
    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}