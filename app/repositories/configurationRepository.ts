import db from '../../database/models'
import sequelize from 'sequelize'

interface ConfigurationBody {
    brand?: string
    model?: string
    generation?: string
    year_from?: Date
    year_until?: Date
    engine_volume_from?: number
    engine_volume_until?: number
    price_from?: number
    price_until?: number
    type?: string
    transmission?: string
    mileage_from?: number
    mileage_until?: number
    location_id?: string
}

const getAllConfigurations = async (limit?: number, offset?: number) => {
    return await db.Configuration.findAll({
        attributes: [
            'id',
            [sequelize.col('CarBrand.name'), 'brand'],
            [sequelize.col('CarModel.name'), 'model'],
            [sequelize.col('CarGeneration.name'), 'generation'],
            'year_from',
            'year_until',
            'engine_volume_from',
            'engine_volume_until',
            'price_from',
            'price_until',
            'type',
            'transmission',
            'mileage_from',
            'mileage_until'
        ],
        include: [
            {model: db.CarBrand, attributes: []},
            {model: db.CarModel, attributes: []},
            {model: db.CarGeneration, attributes: []},
            {model: db.Location, attributes: {exclude: ['createdAt', 'updatedAt']}},
        ],
        limit: limit,
        offset: offset
    })
}

const getConfigurationById = async (id: string) => {
    return await db.Configuration.findByPk(id, {
        attributes: [
            'id',
            [sequelize.col('CarBrand.name'), 'brand'],
            [sequelize.col('CarModel.name'), 'model'],
            [sequelize.col('CarGeneration.name'), 'generation'],
            'year_from',
            'year_until',
            'engine_volume_from',
            'engine_volume_until',
            'price_from',
            'price_until',
            'type',
            'transmission',
            'mileage_from',
            'mileage_until'
        ],
        include: [
            {model: db.CarBrand, attributes: []},
            {model: db.CarModel, attributes: []},
            {model: db.CarGeneration, attributes: []},
            {model: db.Location, attributes: {exclude: ['createdAt', 'updatedAt']}},
        ]
    })
}

const createConfiguration = async (configurationBody: ConfigurationBody) => {
    const brand = configurationBody.brand
        ? await db.CarBrand.findOne({where: {name: configurationBody.brand}}) : null

    const model = configurationBody.model
        ? await db.CarModel.findOne({where: {name: configurationBody.model}}) : null

    const generation = configurationBody.generation
        ? await db.CarGeneration.findOne({where: {name: configurationBody.generation}}) : null

    const preparedBody = {
        brand_id: brand?.id || null,
        model_id: model?.id || null,
        generation_id: generation?.id || null,
        year_from: configurationBody.year_from || null,
        year_until: configurationBody.year_until || null,
        engine_volume_from: configurationBody.engine_volume_from || null,
        engine_volume_until: configurationBody.engine_volume_until || null,
        price_from: configurationBody.price_from || null,
        price_until: configurationBody.price_until || null,
        type: configurationBody.type || null,
        transmission: configurationBody.transmission || null,
        mileage_from: configurationBody.mileage_from || null,
        mileage_until: configurationBody.mileage_until || null,
        location_id: configurationBody.location_id || null,
    }

    const newConfiguration = await db.Configuration.create({...preparedBody})

    delete newConfiguration.dataValues.createdAt
    delete newConfiguration.dataValues.updatedAt

    return newConfiguration
}

const addConfigurationToOrder = async (configurationId:string, orderId:string) => {
    const created_order_configuration = await db.Order_Configuration.create({ order_id: orderId, configuration_id: configurationId })
    return created_order_configuration;
}

const updateConfigurationById = async (id: string, configurationBody: ConfigurationBody) => {
    let configuration = await db.Configuration.findByPk(id)

    if (configuration) {
        const brand = configurationBody.brand
            ? await db.CarBrand.findOne({where: {name: configurationBody.brand}}) : null

        const model = configurationBody.model
            ? await db.CarModel.findOne({where: {name: configurationBody.model}}) : null

        const generation = configurationBody.generation
            ? await db.CarGeneration.findOne({where: {name: configurationBody.generation}}) : null

        const preparedBody: any = {
            brand_id: brand?.id,
            model_id: model?.id,
            generation_id: generation?.id,
            year_from: configurationBody.year_from,
            year_until: configurationBody.year_until,
            engine_volume_from: configurationBody.engine_volume_from,
            engine_volume_until: configurationBody.engine_volume_until,
            price_from: configurationBody.price_from,
            price_until: configurationBody.price_until,
            type: configurationBody.type,
            transmission: configurationBody.transmission,
            mileage_from: configurationBody.mileage_from,
            mileage_until: configurationBody.mileage_until,
            location_id: configurationBody.location_id,
        }

        Object.keys(preparedBody).forEach(key => preparedBody[key] === undefined ? delete preparedBody[key] : {})

        await db.Configuration.update({...preparedBody}, {where: {id}})

        return [await getConfigurationById(id), undefined]
    }

    return [null, 'There is no configuration with provided id']
}

const deleteConfigurationById = async (id: string) => {
    const configuration = await db.Configuration.findByPk(id)

    if (configuration) {
        await configuration.destroy()
    }

    return
}

module.exports = {
    getAllConfigurations,
    getConfigurationById,
    createConfiguration,
    updateConfigurationById,
    deleteConfigurationById,
    addConfigurationToOrder,
}