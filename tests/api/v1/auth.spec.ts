import * as request from 'supertest';
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';

const app = createServer();
let token: string;

describe('Auth API checks', () => {
  it('Check login account', (done) => {
    request(app)
      .post(`/${API}/auth/login`)
      .send({
        email: 'test@gmail.com',
        password: '12345'
      })
      .expect(200)
      .then((response) => {
        token = response.body.payload.token;
        done();
      });
  });
  it('Check auth information', (done) => {
    request(app)
      .get(`/${API}/auth`)
      .set('Authorization', token)
      .expect(200, done);
  });
  // it('Check register account', (done) => {
  //   request(app)
  //     .post(`/${API}/auth/register`)
  //     .send({
  //       email: 'test@gmail.com',
  //       password: '12345',
  //       first_name: 'Miftahul',
  //       last_name: 'Arifin'
  //     })
  //     .expect(200, done);
  // });
});
