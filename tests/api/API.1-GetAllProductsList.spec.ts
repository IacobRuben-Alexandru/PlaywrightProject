import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from './requests/ProductRequests'

test('Get all products list', async ({ request }) => {
    const api = new ProductRequests(request);

    const response = await api.getProductList();

    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBe(true);

    for (const product of responseBody.products) {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
    }
});