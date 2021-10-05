import * as request from 'supertest';
import { createServer } from '../../../src/server';
import { API } from '../../../src/constants';

const app = createServer();
let token: string;
let id: string;

describe('Auth API checks', () => {
  it('Check register user', (done) => {
    request(app)
      .post(`/${API}/user/register`)
      .send({
        email: 'test1@gmail.com',
        password: '12345',
        first_name: 'Miftahul',
        last_name: 'Arifin'
      })
      .expect(200, done);
  });
  it('Check login user', (done) => {
    request(app)
      .post(`/${API}/auth/login`)
      .send({
        email: 'test1@gmail.com',
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
      .expect(200)
      .then((response) => {
        id = response.body.payload.id;
        done();
      });
  });
  it('Check remove account', (done) => {
    request(app)
      .put(`/${API}/user/remove`)
      .set('Authorization', token)
      .send({
        id: id
      })
      .expect(200, done);
  });
});
