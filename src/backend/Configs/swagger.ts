import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Define the swagger options
const options: Options = {
  definition: {
    openapi: '3.0.0', // Version of OpenAPI
    info: {
      title: 'API Документация',
      version: '1.0.0',
      description: 'Пример API с использованием swagger-jsdoc',
    },
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
  },
  apis: ['./backend/Configs/swagger.config.ts'], // Path to API description files
};

// Generate Swagger specification
const swaggerSpec = swaggerJsDoc(options);
export { swaggerSpec, swaggerUi };
