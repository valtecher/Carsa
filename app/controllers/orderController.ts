import {Request, Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import orderRepository from '../repositories/orderRepository'
import { OrderType } from '../../types/order'
const clientRepository = require('../repositories/clientRepository');
import managerRepository from '../repositories/managerRepository'
import ConfigurationType from '../../types/configuration'
import { CarType } from '../../types/car'
import locationRepository from '../repositories/locationRepository'
import { PaymentType } from '../../types/payment';
const carRepository = require('../repositories/carRepository');
const configurationRepository = require('../repositories/configurationRepository')
const paymentRepository = require('../repositories/paymentRepository')

const getAllOrders = async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit)

    if (page && limit) {
        const offset = (page - 1) * limit
        const orders = await orderRepository.getAllOrders(limit, offset)
        return res.json(orders)
    } else {
        const orders = await orderRepository.getAllOrders()
        return res.json(orders)
    }
}

const getAllDetailedOrders = async (req: Request, res: Response) => {
    const page: number = Number(req.query.page) || 1
    const limit: number = Number(req.query.limit)

    if (page && limit) {
        const offset = (page - 1) * limit
        const orders = await orderRepository.getAllDetailedOrders(limit, offset)
        return res.json(orders)
    } else {
        const orders = await orderRepository.getAllDetailedOrders()
        return res.json(orders)
    }
}

const getOrderById = async (req: Request, res: Response) => {
    const id = req.params.id
    const order = await orderRepository.getOrderById(id)

    return res.json(order || {})
}

const addOrder = async (req: Request, res: Response) => {
    const orderBody = req.body
    const client = await clientRepository.getClientByEmail(req.body.client.email)
    const manager = await managerRepository.getRandomManager();
    const order:OrderType = {
        status: 'Paid',
        client_id: client.person_id,
        manager_id: manager.person_id,
        date: new Date(),
        sum: orderBody.package.price,
    }
    const newOrder = await orderRepository.createOrder(order);

    const payment:PaymentType = {
        date: new Date(),
        amount: req.body.package.price,
        sum: req.body.package.price,
        order_id: newOrder.id
    }
    const newPayment = await paymentRepository.createPayment(payment);
    await newPayment.save();
    await newOrder.save();
    if( req.body.configuration ) { 
        if(req.body.package){
            if(req.body.package.price === 200){
                const carBody = req.body.configuration;
                const location = await locationRepository.getLocationByName(carBody.location_id)
                const car:CarType = { ...carBody, generation_id: carBody.CarGeneration.id, price: carBody.price.replace(/\D/g,''), location_id: location.id, mileage: carBody.mileage.replace('km', ''), brand_id: carBody.CarGeneration.CarModel.CarBrand.id, model_id: carBody.CarGeneration.CarModel.id, registrationNumber: '', }
                console.log(car)
                const createdCar = await carRepository.createCar(car);
                await createdCar.save();
                const car_order = await carRepository.addCarToOrder(createdCar.id, newOrder.id)
                await car_order.save();
                res.json({ success: true, car_order, car: createdCar, order: newOrder  })
            } else {
                console.log('there is configuration');
                const configurationBody = req.body.configuration; 
                const generation = await carRepository.getGenerationByName(configurationBody.CarGeneration) 
                configurationBody.CarGeneration = generation.id
                configurationBody.CarModel = generation.CarModel.id
                configurationBody.CarBrand = generation.CarModel.CarBrand.id
                console.log(configurationBody);
                const configuration:ConfigurationType = {
                    brand_id: generation.id,
                    model_id: generation.CarModel.id,
                    generation_id: generation.CarModel.CarBrand.id,
                    year_from: new Date(Number(configurationBody.year_from), 1, 0),
                    year_until: new Date(Number(configurationBody.year_until), 1, 0),
                    engine_volume_from: configurationBody.engine_volume_from,
                    engine_volume_until: configurationBody.engine_volume_until,
                    price_from: configurationBody.price_from,
                    price_until: configurationBody.price_until,
                    type: configurationBody.type,
                    transmission: configurationBody.transmission,
                    mileage_from: configurationBody.mileage_from,
                    mileage_until: configurationBody.mileage_until,
                }
                console.log('Final configuration: ', configuration)
                const createdConfiguration = await  configurationRepository.createConfiguration(configuration);
                await createdConfiguration.save();
                const order_configuration = await configurationRepository.addConfigurationToOrder(createdConfiguration.id, newOrder.id)
                await order_configuration.save();
                res.json({ success: true, configuration: createdConfiguration, order_configuration })
            }
        }
    }
    return res.status(StatusCodes.CREATED) // .json(newOrder)
}

const editOrderById = async (req: Request, res: Response) => {
    const id = req.params.id
    const orderBody = req.body

    const [changedOrder, message] = await orderRepository.updateOrderById(id, orderBody)

    return changedOrder
        ? res.json(changedOrder)
        : res.status(StatusCodes.BAD_REQUEST).json({message})
}

const deleteOrderById = async (req: Request, res: Response) => {
    const id = req.params.id
    await orderRepository.deleteOrderById(id)
    return res.sendStatus(StatusCodes.OK)
}

export default {
    getAllOrders,
    getAllDetailedOrders,
    getOrderById,
    addOrder,
    editOrderById,
    deleteOrderById
}