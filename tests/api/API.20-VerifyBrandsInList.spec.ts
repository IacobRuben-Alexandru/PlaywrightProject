import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests';
interface Brand {
  brand: string;
}

interface BrandsResponse {
  brands: Brand[];
}

interface Product {
  brand: string;
  [key: string]: unknown;
}

interface ProductsResponse {
  responseCode: number;
  products: Product[];
}

test('Verify all brands in list are valid', async ({ request }) => {
  const api = new ProductRequests(request);

  const brandsResponse = await api.getAllBrandsList();
  expect(brandsResponse.status()).toBe(200);
  const brandsBody = (await brandsResponse.json()) as BrandsResponse;

  const brands: string[] = brandsBody.brands.map((b: Brand) => b.brand);
  expect(Array.isArray(brands)).toBe(true);
  expect(brands.length).toBeGreaterThan(0);

  const productsResponse = await api.getProductList();

  expect(productsResponse.status()).toBe(200);
  const productsBody = (await productsResponse.json()) as ProductsResponse;
  const products: Product[] = productsBody.products;

  expect(productsBody.responseCode).toBe(200);
  expect(Array.isArray(products)).toBe(true);
  expect(products.length).toBeGreaterThan(0);

  for (const product of products) {
    expect(product).toHaveProperty('brand');
    expect(brands).toContain(product.brand);
  }
});
