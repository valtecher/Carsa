// const {spawn} = require('child_process')
//
// const link = 'https://www.otomoto.pl/oferta/audi-s4-audi-s4-3-0tfsi-biala-skora-rotor-ID6EjWW9.html'
//
// const python = spawn('python', ['offer_scrapper.py', link])
//
// python.stdout.on('data', (data) => {
//     // const dataFromScraper = JSON.parse(data.toString().replaceAll('\'', '"'))
//     console.log(data.toString())
// })

const _ = require('lodash')
const data = require('./parsed_data.json')
const {value} = require("lodash/seq");

const generations = _.flattenDeep(data
    .map(brand => brand.models
        .filter(model => model.generations !== null)
        .map(model => model.generations
            .map(generation => {
                return {
                    id: generation.generation_id,
                    name: generation.generation_name,
                    start_year: generation.start_year,
                    end_year: generation.end_year,
                    model_id: model.model_id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        )
    )
)