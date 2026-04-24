import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';

test('Post to verify valid login', async ({ request }) => {
  const response = await request.post('/api/verifyLogin', {
    form: {
      email: USERS.email,
      password: USERS.password,
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toBe('User exists!');
});
