import request from 'supertest';
import { NoteRepository } from 'domain/repository/NoteRepository';
import { app } from 'app';

describe('# Notes resource (GET /api/v1/notes)', () => {
  let spy: jest.SpyInstance<any, any>;
  let req: request.SuperTest<request.Test>;

  beforeEach(() => {
    spy = jest.spyOn(NoteRepository.prototype, 'findPaged');
    // first page
    spy.mockReturnValue(Promise.resolve([]));
    req = request(app);
  });

  afterEach(() =>{
    spy.mockReset();
  });

  describe('Public notes', () => {
    it('returns the first page of notes', async () => {
      await req.get('/api/v1/notes')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([]);

      expect(spy.mock.calls[0][0]).toBe(0);

      await req.get('/api/v1/notes')
        .query({ page: 0 })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([]);

      expect(spy.mock.calls[1][0]).toBe(0);
    });

    it('return notes by second page (GET /api/v1/notes?page=1)', async () => {
      await req.get('/api/v1/notes')
        .query({ page: 1 })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect([]);

      expect(spy.mock.calls[0][0]).toBe(1);
    });
  });

  describe('Private notes', () => {
    describe('without authentication', () => {
    });
    describe('with authentication', () => {
      it('returns the first page of notes', async () => {
        await req.get('/api/v1/notes')
          .auth('', '')
          .expect(200)
          .expect('Content-Type', /json/)
          .expect([]);

        expect(spy.mock.calls[0][0]).toBe(0);
      });
    });
  });
});
