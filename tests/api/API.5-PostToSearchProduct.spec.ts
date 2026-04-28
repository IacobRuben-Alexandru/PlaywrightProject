import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';
test('Post to search product', async ({ request }) => {
  const api = new ProductRequests(request);
  
  const response = await api.postToSearchProduct('top');

  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(200);
  expect(Array.isArray(responseBody.products)).toBe(true);
  for (const product of responseBody.products) {
    expect(product).toHaveProperty('brand');
    expect(product).toHaveProperty('name');
  }
});
