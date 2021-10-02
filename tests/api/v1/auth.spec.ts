import * as request from 'supertest';
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';

const app = createServer();

describe('Auth API checks', () => {
  // it('Check auth information', (done) => {
  //   request(app).get(`/${API}/auth`).expect(200, done);
  // });
  it('Check register account', (done) => {
    request(app)
      .post(`/${API}/auth/register`)
      .send({
        email: 'miftahul97@gmail.com',
        password: '12345',
        first_name: 'Miftahul',
        last_name: 'Arifin'
      })
      .expect(200, done);
  });
  // it('Check login account', (done) => {
  //   request(app).get(`/${API}/auth`).expect(200, done);
  // });
});
