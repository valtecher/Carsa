import db from '../../database/models'

const getAllOrders = async (limit?: number, offset?: number) => {
    return await db.Order.findAll({
        attributes: [
            'id',
            'status',
            'client_id',
            'manager_id',
            'date',
        ],
        limit: limit,
        offset: offset
    })
}

const getAllDetailedOrders = async (limit?: number, offset?: number) => {
    return await db.Order.findAll({
        attributes: [
            'id',
            'status',
            'date',
        ],
        include: [
            {model: db.Client, include: [{model: db.Person}]},
            {model: db.Manager, include: [{model: db.Employee}]},
            {
                model: db.Car,
                include: [{
                    model: db.ReportOverview,
                    include: [{
                        model: db.Report,
                        include: [{model: db.ReportType, attributes: ['name']}]
                    }, {model: db.Technician, include: [{model: db.Employee, include: [db.Person]}]}]
                }, {model: db.CarGeneration, include: [{model: db.CarModel, include: db.CarBrand}]}],
                as: 'cars'
            },
            {
                model: db.Configuration,
                as: 'order_configuration',
                include: [{model: db.CarBrand}, {model: db.CarModel}, {model: db.CarGeneration}]
            },
            // db.Payment,
            // {
            //     model: db.Car,
            //     include: [{
            //         model: db.ReportOverview,
            //         include: [{
            //             model: db.Report,
            //             include: [{model: db.ReportType, attributes: ['name']}]
            //         }, {model: db.Technician, include: [{model: db.Employee, include: [db.Person]}]}]
            //     }, {model: db.CarGeneration, include: [{model: db.CarModel, include: db.CarBrand}]}],
            //     as: 'cars'
            // },
            // {model: db.Manager, include: [{model: db.Employee, include: [{model: db.Person}]}]}
        ],
        limit: limit,
        offset: offset
    });
}
const getOrderById = async (id: string) => {
    return await db.Order.findByPk(id, {
        include: [
            {model: db.Client},
            {model: db.Configuration, as: 'order_configuration'},
            db.Payment,
            {model: db.Car, as: 'cars'}
        ]
    })
}

const createOrder = async (orderBody: any) => {
    const preparedBody = {
        status: orderBody?.status || 'created',
        client_id: orderBody.client_id || null,
        sum: orderBody.sum || null,
        manager_id: orderBody.manager_id || null,
        date: orderBody.date || new Date(),
    }

    const newOrder = await db.Order.create({...preparedBody})

    delete newOrder.dataValues.createdAt
    delete newOrder.dataValues.updatedAt

    return newOrder
}

const updateOrderById = async (id: string, modifiedOrder: any) => {
    let order = await db.Order.findByPk(id)

    if (order) {

    }

    return [null, 'There is no order with provided id']
}

const deleteOrderById = async (id: string) => {
    console.log('fffff')

    const order = await db.Order.findByPk(id)
    console.log('aaaaaa')

    if (order) {
        await order.destroy()
        console.log('bbbbb')
    }

    return
}

export default {
    getAllOrders,
    getAllDetailedOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById
}