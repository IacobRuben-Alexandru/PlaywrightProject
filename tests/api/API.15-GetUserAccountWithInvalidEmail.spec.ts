import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'

test('Get user details with invalid email', async ({ request }) => {
  const response2 = await request.get('/api/getUserDetailByEmail', {
    params: {
      email: faker.internet.email(),
    },
  });

  const responseBody2 = await response2.json();
  expect(response2.status()).toBe(200);
  expect(responseBody2.responseCode).toBe(404);
  expect(responseBody2.message).toBe(
    'Account not found with this email, try another email!',
  );
});
