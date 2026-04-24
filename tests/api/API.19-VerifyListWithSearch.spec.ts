import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';

test('Verify that all all products in list can be searched', async ({
  request,
}) => {
  const response = await request.get('/api/productsList');

  expect(response.status()).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.responseCode).toBe(200);
  expect(responseBody).toHaveProperty('products');
  expect(Array.isArray(responseBody.products)).toBe(true);
  expect(responseBody.products.length).toBeGreaterThan(0);

  for (const product of responseBody.products) {
    const searchResponse = await request.post('/api/searchProduct', {
      form: {
        search_product: product.name,
      },
    });
    expect(searchResponse.status()).toBe(200);

    const searchResponseBody = await searchResponse.json();

    expect(searchResponseBody.responseCode).toBe(200);
    expect(Array.isArray(searchResponseBody.products)).toBe(true);

    const foundProduct = searchResponseBody.products.find(
      (p: { id: any }) => p.id === product.id,
    );
    expect(foundProduct).toBeDefined();
  }
});
