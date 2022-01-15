import { CarType } from "../../interfaces/models/car"

export const SAVE_CAR = '@car/SAVE_CAR'


export const CREATE_CAR_ATTEMPT = '@car/CREATE_CAR_ATTEMPT'
export const CREATE_CAR_SUCCEED = '@car/CREATE_CAR_SUCCEED'
export const CREATE_CAR_FAILED = '@car/CREATE_CAR_FAILED'

export const GET_CAR_ATTEMPT = '@car/GET_CAR_ATTEMPT'
export const GET_CAR_SUCCESS = '@car/GET_CAR_SUCCESS'
export const GET_CAR_FAILED = '@car/GET_CAR_FAILED'

export const GET_ALL_CARS_ATTEMPT = '@car/GET__ALL_CAR_ATTEMPT'
export const GET_ALL_CARS_SUCCESS = '@car/GET_ALL_CARS_SUCCESS'
export const GET_ALL_CARS_FAILED = '@car/GET_ALL_CARS_FAILED'

export const GET_CAR_BRANDS_ATTEMPT = '@car/GET_CAR_BRANDS_ATTEMPT'
export const GET_CAR_BRANDS_SUCCESS = '@car/GET_CAR_BRANDS_SUCCESS'
export const GET_CAR_BRANDS_FAILED = '@car/GET_CAR_BRANDS_FAILED'

export const GET_CAR_CLIENT_ATTEMP = '@car/GET_CAR_CLIENT_ATTEMP'
export const GET_CAR_CLIENT_SUCCESS = '@car/GET_CAR_CLIENT_SUCCESS'
export const GET_CAR_CLIENT_FAILED = '@car/GET_CAR_CLIENT_FAILED'

export const UPDATE_CAR_ATTEMPT = '@car/UPDATE_CAR_ATTEMPT'
export const UPDATE_CAR_SUCCESS = '@car/UPDATE_CAR_SUCCESS'
export const UPDATE_CAR_FAILED = '@car/UPDATE_CAR_FAILED'


export const DELETE_CAR_ATTEMPT = '@car/DELETE_CAR_ATTEMPT'
export const DELETE_CAR_SUCCESS = '@car/DELETE_CAR_SUCCESS'
export const DELETE_CAR_FAILED = '@car/DELETE_CAR_FAILED'


export const SET_SELECTEDCAR = '@car/SET_SELECTEDCAR'
export const DELETE_SELECTEDCAR = '@car/DELETE_SELECTED_CAR'

export const saveCar = (payload: any) => {
    return {
        type: SAVE_CAR,
        payload
    }
}

export const deleteSelectedCar = () => {
    return {
        type: DELETE_SELECTEDCAR
    }
}
export const setSelectedcar = (car:CarType) => {
    return {
        type: SET_SELECTEDCAR,
        car
    }
}


export const getClientCar = () => {
    return {
        type: GET_CAR_CLIENT_ATTEMP
    }
}

export const getClientCarSuccess = () => {
    return {
        type: GET_CAR_CLIENT_SUCCESS
    }
}

export const getClientCarFailed = () => {
    return {
        type: GET_CAR_CLIENT_FAILED
    }
}

export const getCarBrandsAttempt = (payload: any) => {
    return {
        type: GET_CAR_BRANDS_ATTEMPT,
    }
}

export const getCarBrandsSuccess = () => {
    return {
        type: GET_CAR_BRANDS_SUCCESS
    }
}

export const getCarBrandsFailed = () => {
    return {
        type: GET_CAR_BRANDS_FAILED,
    }
}

export const createCarAttempt = () => {
    return {
        type: CREATE_CAR_ATTEMPT
    }
}

export const createCarSuccess = () => {
    return {
        type: CREATE_CAR_SUCCEED
    }
}

export const createCarFailed = () => {
    return {
        type: CREATE_CAR_FAILED
    }
}

export const getCarAttempt = () => {
    return {
        type: GET_CAR_ATTEMPT,
    }
}

export const getCarSuccess = () => {
    return {
        type: GET_CAR_SUCCESS,
    }
}
export const getCarFailed = () => {
    return {
        type: GET_CAR_FAILED,
    }
}

export const updateCarAttempt = (payload: any) => {
    return {
        type: UPDATE_CAR_ATTEMPT,
        payload
    }
}

export const updateCarSuccess = () => {
    return {
        type: UPDATE_CAR_SUCCESS,

    }
}

export const updateCarFailed = () => {
    return {
        type: UPDATE_CAR_FAILED,
    }
}


export const deleteCarAttempt = (payload: any) => {
    return {
        type: DELETE_CAR_ATTEMPT,
        payload
    }
}

export const deleteCarSuccess = () => {
    return {
        type: DELETE_CAR_SUCCESS,
    }
}

export const deleteCarFailed = () => {
    return {
        type: DELETE_CAR_FAILED,
    }
}