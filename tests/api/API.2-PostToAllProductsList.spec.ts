import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Post to all products list', async ({ request }) => {
  const api = new ProductRequests(request);

  const response = await api.postToAllProductList();

  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(405);

  expect(await responseBody.message).toBe(
    'This request method is not supported.',
  );
});
