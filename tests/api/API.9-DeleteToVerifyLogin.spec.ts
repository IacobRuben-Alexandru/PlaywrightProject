import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Delete to verify invalid login', async ({ request }) => {
  const api = new ProductRequests(request);
    
  const response = await api.deleteToVerifyLogin();

  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(405);
  expect(responseBody.message).toBe('This request method is not supported.');
});
