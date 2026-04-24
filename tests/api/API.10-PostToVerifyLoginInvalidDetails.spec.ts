import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test('Post to verify invalid login', async ({ request }) => {
  const response = await request.post('/api/verifyLogin', {
    form: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(404);
  expect(responseBody.message).toBe('User not found!');
});
