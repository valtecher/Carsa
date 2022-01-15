const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Bitok API',
            version: '1.0.0',
            description: 'Interactive documentation for Bitok API',
            license: {
                name: 'Licensed Under MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: "API Support Team",
                email: "bitol-support@gmail.com"
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server',
                }
            ],
        }
    },
    apis: ['./app/documentation/*/*.yaml']
}

module.exports = swaggerJsDoc(swaggerOptions)