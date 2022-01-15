import {OrderType as Order} from '../../interfaces/models/order'

export const SAVE_ORDER = 'SAVE_ORDER'

export const GET_ORDER = 'GET_ORDER'
export const GET_ORDER_SUCCEED = 'GET_ORDER_SUCCEED'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'

export const EDIT_ORDER = 'EDIT_ORDER'
export const EDIT_ORDER_SUCCEED = 'EDIT_ORDER_SUCCEED'
export const EDIT_ORDER_FAILED = 'EDIT_ORDER_FAILED'

export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER'
export const DELETE_SELECTED_ORDER = 'DELETE_SELECTED_ORDER'

export const saveOrder = (payload: any) => {
    return {
        type: SAVE_ORDER,
        payload
    }
}

export const getOrder = () => {
    return {
        type: GET_ORDER,
    }
}

export const getOrderSuccess = () => {
    return {
        type: GET_ORDER_SUCCEED
    }
}

export const setSelectedOrder = (order: Order) => {
    return {
        type: SET_SELECTED_ORDER,
        order,
    }
}

export const deleteSelectedOrder = () => {
    return {
        type: SET_SELECTED_ORDER,
    }
}