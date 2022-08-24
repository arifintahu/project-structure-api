import * as swaggerJsdoc from 'swagger-jsdoc';
import AppConfig from '../../config/appConfig';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '0.1.0',
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
                url: `/${AppConfig.app.api}`,
                description: `Server ${AppConfig.app.server}`
            }
        ]
    },
    apis: ['./dist/api/routes/v1/*.route.js']
};

export const specs = swaggerJsdoc(options);
