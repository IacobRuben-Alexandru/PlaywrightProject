import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';

test('Delete to verify invalid login', async ({ request }) => {
  const response = await request.delete('/api/verifyLogin', {
    form: {
      email: USERS.email,
      password: USERS.password,
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toBe('This request method is not supported.');
});
