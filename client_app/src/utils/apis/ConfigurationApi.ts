import axios from "axios"

export const getConfigurationsForSelector =  async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/configurations/list`).then((res) =>{return res.data} );
}

export const addCarToOrder = async (car:any) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/orders/car`, {...car}).then((res) => res.data)
}