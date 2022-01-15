import db from '../../database/models'
import sequelize, {Op} from 'sequelize'
import {ParsedUrlQuery} from 'querystring'

const getAllOverviews = async (query: ParsedUrlQuery) => {
    return await db.ReportOverview.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: {
            model: db.Report,
            attributes: ['id', 'condition', 'details'],
            include: {
                model: db.ReportType,
                attributes: [[sequelize.col('name'), 'type']]
            },
        },
        where: {...query}
    })
}

const getOverviewByCarId = async (carId: string ) => {
    const overviews =  await db.ReportOverview.findAll({ where: { car_id: carId }, include: [ { model: db.Report, include: [{ model: db.ReportType, attributes: [[sequelize.col('name'), 'type']] }] } ]})
    console.log('Found overview: ', overviews);
    return overviews;

}

const getOverviewById = async (id: string) => {
    return await db.ReportOverview.findByPk(id, {
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
            {
                model: db.Report,
                attributes: ['id', 'condition', 'details'],
                include: [{
                    model: db.ReportType,
                    attributes: [[sequelize.col('name'), 'type']]
                }]
            },
        ],
    })
}

const addOverview = async (overviewBody: any) => {
    const preparedBody = {
        date: overviewBody.date ?? new Date(),
        car_id: overviewBody.car_id,
        technician_id: overviewBody.technician_id
    }

    const existingOverview = await db.ReportOverview.findOne({
        where: {
            car_id: preparedBody.car_id,
            technician_id: preparedBody.technician_id,
            date: {
                [Op.gt]: new Date(),
                [Op.lt]: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        }
    })

    if (!existingOverview) {
        let newOverview = await db.ReportOverview.create({...preparedBody})

        delete newOverview.dataValues.createdAt
        delete newOverview.dataValues.updatedAt
        newOverview.dataValues.Reports = []

        return newOverview
    }

    return false
}

const deleteOverviewById = async (id: string) => {
    const existingOverview = await db.ReportOverview.findOne({where: {id}})

    if (existingOverview) {
        // @ts-ignore
        await db.Report.destroy({
            where: {'overview_id': id}
        })

        // @ts-ignore
        return await db.ReportOverview.destroy({where: {id}})
    }

    return false
}

module.exports = {
    getAllOverviews,
    getOverviewByCarId,
    getOverviewById,
    addOverview,
    deleteOverviewById
}