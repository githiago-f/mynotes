import request from 'supertest';
import { NoteRepository } from 'domain/repository/NoteRepository';
import { app } from 'app';
import { Note } from 'domain/entity/Note';

describe('# Notes resource', () => {
  describe('Public notes', () => {
    describe('No items created', () => {
      beforeAll(() => {
        jest.spyOn(Note, 'findAll')
          .mockReturnValue(Promise.resolve([]));
      });
      afterAll(() =>{
        jest.clearAllMocks();
      });
      it('will return a empty array (GET /api/v1/notes)', async () => {
        const data = await request(app).get('/api/v1/notes');
        expect(data.statusCode).toBe(200);
        expect(data.body).toEqual([]);
      });
    });

    describe('Any note has been created', () => {
      beforeAll(() => {
        jest.spyOn(Note, 'findAll')
          .mockReturnValue(Promise.resolve([
            new Note(),
            new Note(),
            new Note()
          ]));
      });

      afterAll(() =>{
        jest.clearAllMocks();
      });

      it('return all notes', async () => {
        const data = await request(app).get('/api/v1/notes');
        expect(data.statusCode).toBe(200);
        expect(data.body).toEqual([
          {
            title: ''
          }
        ]);
      });
    });
  });
});
