const request = require('supertest');
const server = require('../src/index');
const inMemory = require('../src/storage/inMemory');

jest.mock('../src/storage/postgres', () => {
  return {
    get: jest.fn(),
    set: jest.fn(),
  };
});

const postgres = require('../src/storage/postgres');

afterAll((done) => {
  server.close(done);
});

describe('Rate Limiting', () => {
  beforeEach(() => {
    postgres.get.mockImplementation(inMemory.get);
    postgres.set.mockImplementation(inMemory.set);
  });

  it('should return 429 Too Many Requests when the rate limit is exceeded for /foo', async () => {
    const agent = request.agent(server);
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        agent.get('/foo').set('Authorization', 'Bearer client-1')
      );
    }
    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429);
  });

  it('should return 429 Too Many Requests when the rate limit is exceeded for /bar', async () => {
    const agent = request.agent(server);
    const requests = [];
    for (let i = 0; i < 15; i++) {
      requests.push(
        agent.get('/bar').set('Authorization', 'Bearer client-1')
      );
    }
    const responses = await Promise.all(requests);
    const lastResponse = responses[responses.length - 1];
    expect(lastResponse.status).toBe(429);
  });
});
