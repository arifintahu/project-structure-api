import swaggerJsdoc from 'swagger-jsdoc';
import AppConfig from '../../config/appConfig';

const apiVersion = AppConfig.app.apiVersion;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Project Structure API',
            version: '3.0.0',
            description:
                'Production-ready API template with TypeScript, Express, and Sequelize',
            contact: {
                name: 'API Support',
                url: 'https://github.com/arifintahu/project-structure-api',
                email: 'miftahul97@gmail.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: `/api/${apiVersion}`,
                description: `Server ${AppConfig.app.server}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                SuccessResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        data: { type: 'object' }
                    }
                },
                PaginatedResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        items: { type: 'array', items: { type: 'object' } },
                        total: { type: 'integer' },
                        page: { type: 'integer' },
                        limit: { type: 'integer' },
                        totalPages: { type: 'integer' }
                    }
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        statusCode: { type: 'integer' }
                    }
                }
            },
            responses: {
                '200': { description: 'OK' },
                '201': { description: 'Created' },
                '400': { description: 'Bad Request' },
                '401': { description: 'Unauthorized' },
                '403': { description: 'Forbidden' },
                '404': { description: 'Not Found' },
                '409': { description: 'Conflict' },
                '422': { description: 'Unprocessable Entity' },
                '429': { description: 'Too Many Requests' }
            }
        }
    },
    apis: ['./src/api/routes/**/*.ts']
};

export const specs = swaggerJsdoc(options);
