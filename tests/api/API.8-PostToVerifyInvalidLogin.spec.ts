import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';

test('Post to verify invalid login', async ({ request }) => {
  const response = await request.post('/api/verifyLogin', {
    form: {
      password: USERS.password,
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe(
    'Bad request, email or password parameter is missing in POST request.',
  );
});
