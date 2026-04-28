import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { ProductRequests } from './requests/ProductRequests';

test('Get user details with invalid email', async ({ request }) => {
  const api = new ProductRequests(request);

  const response2 = await api.getUserDetails(faker.internet.email());

  const responseBody2 = await response2.json();
  expect(response2.status()).toBe(200);
  expect(responseBody2.responseCode).toBe(404);
  expect(responseBody2.message).toBe(
    'Account not found with this email, try another email!',
  );
});
