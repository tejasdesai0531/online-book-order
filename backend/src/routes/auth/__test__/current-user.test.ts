import request from 'supertest';
import { app } from '../../../app';

it('responds with details about the current user', async () => {
  const token = await global.signin();

  const response = await request(app)
    .get('/api/auth/users/currentuser')
    .set({ "authorization": token })
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/auth/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
