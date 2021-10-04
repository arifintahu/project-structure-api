import * as swaggerJsdoc from 'swagger-jsdoc';
import { API } from '../../constants';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API with Swagger',
      version: '0.1.0',
      description: 'API Documentation with swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      },
      contact: {
        name: 'Miftahul Arifin',
        url: 'https://github.com/arifintahu',
        email: 'miftahul97@gmail.com'
      }
    },
    servers: [
      {
        url: `/${API}`
      }
    ]
  },
  apis: ['./dist/api/routes/v1/*.route.js']
};

export const specs = swaggerJsdoc(options);
