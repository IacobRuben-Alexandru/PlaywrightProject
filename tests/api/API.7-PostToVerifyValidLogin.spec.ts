import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Post to verify valid login', async ({ request }) => {
  const api = new ProductRequests(request);
  
  const response = await api.postToVerifyValidLogin();

  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody.message).toBe('User exists!');
});
