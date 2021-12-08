import request from 'supertest';
import { app } from '../../src/app';

describe('# Application', () => {
  it('should be up and running (GET health)', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      healthy: true,
      message: 'I\'m healthy!'
    });
    expect(response.get('x-powered-by'))
      .toBe('None of your business :)');
  });
});
