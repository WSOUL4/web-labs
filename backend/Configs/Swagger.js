import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const options = {
    definition: {
        openapi: '3.0.0', // Версия OpenAPI
        swagger: "6.2.8",
        info: {
            title: 'API Документация',
            version: '1.0.0',
            description: 'Пример API с использованием swagger-jsdoc',
        },
    },
    apis: ['./backend/Configs/SwaggerConfig.js'], // Путь к файлам с описанием API
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            API_KEY: {
                type: 'apiKey',
                in: 'header',
                name: 'API_KEY',
                description: 'Введите ваш API ключ',
            },
        },
    },
    security: [
        {
            API_KEY: ['what'],
        },
    ],

};

const swaggerSpec = swaggerJsDoc(options);
export {swaggerSpec,swaggerUi};

