import request from 'supertest';
import app from '../server/app';

describe('POST /analyze', () => {
  it('returns priority analysis', async () => {
    const res = await request(app)
      .post('/analyze')
      .send({ message: 'The bathroom pipe burst!' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('priority');
    expect(res.body.keywords).toContain('burst');
  });
});
