import db from '../../../database/models';
import moment from 'moment';

const createCarOrderLink = async (car_id:string, order_id:string) => {
    return await db.Car_Order.create({
        order_id,
        car_id,
        start_reservation: moment().toISOString(),
        status: 'Reserved'
    });
}

export default {
    createCarOrderLink
}