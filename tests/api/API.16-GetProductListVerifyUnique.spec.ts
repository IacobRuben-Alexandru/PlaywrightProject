import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Get all products list and verify unique product IDs', async ({
  request,
}) => {
  const api = new ProductRequests(request);

  const response = await api.getProductList();

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.responseCode).toBe(200);
  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);
  const ids = responseBody.products.map((product: { id: any }) => product.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});
