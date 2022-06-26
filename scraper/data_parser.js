const fs = require('fs')
const _ = require('lodash')
const uuid = require('uuid')
const data = require('./data.json')

const GENERATION_PATTERN = /^(.+)\((\d{4})?\s*-\s*(\d{4})?\)$/
const brands_models_generations = []

for (const brand in data) {
    const models = []

    if (_.isEmpty(data[brand][0]))
        continue

    for (const model of data[brand]) {
        const modelName = Object.keys(model)[0]
        let generations = []

        if (model[modelName] === null) {
            generations = null
        } else {
            for (const generation in model[modelName]) {
                const groups = model[modelName][generation].match(GENERATION_PATTERN)

                let generation_name, from, until

                if (groups) {
                    generation_name = groups[1].trim()
                    from = groups[2] || null
                    until = groups[3] || null
                } else {
                    generation_name = model[modelName][generation]
                    from = null
                    until = null
                }
                generations.push({
                    generation_id: uuid.v4(),
                    generation_name: generation_name,
                    start_year: from,
                    end_year: until
                })
            }
        }
        models.push({
            model_id: uuid.v4(),
            model_name: modelName,
            generations: generations
        })
    }
    brands_models_generations.push({
        brand_id: uuid.v4(),
        brand_name: brand,
        models: models
    })
}

const file = fs.createWriteStream('parsed_data.json', "utf-8")
file.write(JSON.stringify(brands_models_generations, null, 2), 'utf-8')
file.end()