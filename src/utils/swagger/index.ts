import * as swaggerJsdoc from 'swagger-jsdoc';
import AppConfig from '../../config/appConfig';

const apiVersion = AppConfig.app.apiVersion;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API Documentation with swagger',
            termsOfService: 'http://example.com/terms/',
            contact: {
                name: 'API Support',
                url: 'http://www.example.com/support',
                email: 'support@example.com'
            },
            license: {
                name: 'Apache 2.0',
                url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
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
            responses: {
                '200': {
                    description: 'OK',
                    content: {
                        'application/json': {}
                    }
                },
                '400': {
                    description: 'Bad Request'
                },
                '401': {
                    description: 'Unauthorized'
                },
                '403': {
                    descriptipn: 'Forbidden'
                },
                '422': {
                    description: 'Unprocessable entity'
                }
            }
        }
    },
    apis: [`./docs/${apiVersion}/*.yaml`]
};

export const specs = swaggerJsdoc(options);
