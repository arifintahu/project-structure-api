import * as request from 'supertest';
import { createServer } from '../src/server';
import { API } from '../src/constants';

const app = createServer();

describe('Server checks', () => {
  it('Server is created without error', (done) => {
    request(app).get(`/${API}/user`).expect(200, done);
  });
});
