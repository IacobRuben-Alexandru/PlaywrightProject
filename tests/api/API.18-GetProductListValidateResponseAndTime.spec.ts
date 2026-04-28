import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Get all products list and verify response headers and time', async ({
  request,
}) => {
  const start = Date.now();

  const api = new ProductRequests(request);

  const response = await api.getProductList();

  expect(response.status()).toBe(200);

  const headers = response.headers();

  expect(headers).toHaveProperty('content-type');
  expect(headers).toHaveProperty('server');
  expect(headers['content-type']).toContain('text/html');

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);

  const end = Date.now();
  const duration = end - start;

  console.log('Response time:', duration);

  expect(duration).toBeLessThan(1500);
});
