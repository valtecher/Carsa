import userAuth from '../../interfaces/models/userAuth'
import {
    ATTEMPT_LOGIN,
    ATTEMPT_LOGOUT,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_SUCCESS,
    SAVE_USER
} from '../actions/authActions'

interface State {
    isLoading: boolean
    user: userAuth | null
    isAuthenticated: boolean
}

const initialState: State = {
    isLoading: false,
    user: null,
    isAuthenticated: false,
}

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ATTEMPT_LOGIN:
            return {...state, isLoading: true}
        case LOGIN_SUCCESS:
            localStorage.setItem('isAuthenticated', String(state.isAuthenticated))
            return {...state, isLoading: false}
        case LOGIN_FAILED:
            return {...state, isLoading: false}
        case ATTEMPT_LOGOUT:
            localStorage.setItem('isAuthenticated', String(false))
            return {...state, isLoading: true, isAuthenticated: false};
        case LOGOUT_SUCCESS:
            return {...state, isLoading: false}
        case LOGOUT_FAILED:
            return {...state, isLoading: false}
        case SAVE_USER:
            return {...state, isLoading: false, user: action.payload.user, isAuthenticated: true}
        default:
            return state
    }
}

export default authReducer