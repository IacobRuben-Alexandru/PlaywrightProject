import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Post to verify invalid login', async ({ request }) => {
  const api = new ProductRequests(request);
  
  const response = await api.postToVerifyInvalidLogin();
  
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(400);
  expect(responseBody.message).toBe(
    'Bad request, email or password parameter is missing in POST request.',
  );
});
