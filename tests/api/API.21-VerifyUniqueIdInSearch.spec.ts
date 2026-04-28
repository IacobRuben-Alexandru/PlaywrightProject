import { test, expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';

test('Verify searched items have unique IDs', async ({ request }) => {
  const item = 'Top';

  const api = new ProductRequests(request);

  const searchResponse = await api.postToSearchProduct(item);

  const itemID = [];
  for (const product of (await searchResponse.json()).products) {
    expect(itemID).not.toContain(product.id);
    itemID.push(product.id);
  }
});
