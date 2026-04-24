import { test, expect } from '@playwright/test';

test('Verify searched items have unique IDs', async ({ request }) => {
  const item = 'Top';

  const searchResponse = await request.post('/api/searchProduct', {
    form: { search_product: item },
  });

  const itemID = [];
  for (const product of (await searchResponse.json()).products) {
    expect(itemID).not.toContain(product.id);
    itemID.push(product.id);
  }
});
