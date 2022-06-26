const {spawn} = require('child_process')

const link = 'https://www.otomoto.pl/oferta/audi-s4-audi-s4-3-0tfsi-biala-skora-rotor-ID6EjWW9.html'

const python = spawn('python', ['offer_scrapper.py', link])

python.stdout.on('data', (data) => {
    // const dataFromScraper = JSON.parse(data.toString().replaceAll('\'', '"'))
    console.log(data.toString())
})