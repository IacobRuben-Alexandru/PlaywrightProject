import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';

test('Put to all brands list', async ({ request }) => {
  const response = await request.put('/api/brandsList', {
    data: {
      name: 'Test Product',
      id: 999,
      price: 100,
    },
  });
  const responseBody = await response.json();
  expect(response.status()).toBe(200);

  expect(responseBody.responseCode).toBe(405);

  expect(await responseBody.message).toBe(
    'This request method is not supported.',
  );
});
