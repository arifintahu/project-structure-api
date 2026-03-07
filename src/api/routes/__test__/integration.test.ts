import request from 'supertest';
import { Application } from 'express';

// Mock the entire database config before anything else
jest.mock('../../../database/config', () => ({
    db: {
        authenticate: jest.fn().mockResolvedValue(true),
        close: jest.fn().mockResolvedValue(true)
    }
}));

// Mock bcrypt
jest.mock('bcrypt');

// Mock Role model
jest.mock('../../models/Role', () => {
    const MockRole: any = jest.fn();
    MockRole.init = jest.fn();
    MockRole.create = jest.fn();
    MockRole.findAll = jest.fn();
    MockRole.findOne = jest.fn();
    return { __esModule: true, default: MockRole };
});

// Mock User model
jest.mock('../../models/User', () => {
    const MockUser: any = jest.fn();
    MockUser.init = jest.fn();
    MockUser.create = jest.fn();
    MockUser.findAll = jest.fn();
    MockUser.findAndCountAll = jest.fn();
    MockUser.findByPk = jest.fn();
    MockUser.findOne = jest.fn();
    MockUser.update = jest.fn();
    MockUser.destroy = jest.fn();
    MockUser.belongsTo = jest.fn();
    MockUser.beforeCreate = jest.fn();
    MockUser.beforeUpdate = jest.fn();
    return { __esModule: true, default: MockUser };
});

import { createServer } from '../../../server';

let app: Application;

beforeAll(() => {
    app = createServer();
});

describe('Health Check', () => {
    it('GET /health should return 200 with status ok', async () => {
        const res = await request(app).get('/health');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('uptime');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('database', 'connected');
    });
});

describe('Request ID', () => {
    it('should return X-Request-Id in response headers', async () => {
        const res = await request(app).get('/health');

        expect(res.headers).toHaveProperty('x-request-id');
        expect(res.headers['x-request-id']).toBeDefined();
    });

    it('should echo back the provided X-Request-Id', async () => {
        const requestId = 'test-request-id-123';
        const res = await request(app)
            .get('/health')
            .set('x-request-id', requestId);

        expect(res.headers['x-request-id']).toBe(requestId);
    });
});

describe('Security Headers', () => {
    it('should include helmet security headers', async () => {
        const res = await request(app).get('/health');

        expect(res.headers).toHaveProperty('x-content-type-options', 'nosniff');
        expect(res.headers).toHaveProperty('x-frame-options');
    });
});

describe('API Routes', () => {
    it('POST /api/v1/login with missing fields should return 400', async () => {
        const res = await request(app).post('/api/v1/login').send({});

        expect(res.status).toBe(400);
    });

    it('POST /api/v1/signup with missing fields should return 400', async () => {
        const res = await request(app).post('/api/v1/signup').send({});

        expect(res.status).toBe(400);
    });

    it('GET /api/v1/users without auth should return 401', async () => {
        const res = await request(app).get('/api/v1/users');

        expect(res.status).toBe(401);
    });

    it('GET /api/v1/roles without auth should return 401', async () => {
        const res = await request(app).get('/api/v1/roles');

        expect(res.status).toBe(401);
    });

    it('GET /nonexistent should return 404', async () => {
        const res = await request(app).get('/nonexistent');

        expect(res.status).toBe(404);
    });
});
