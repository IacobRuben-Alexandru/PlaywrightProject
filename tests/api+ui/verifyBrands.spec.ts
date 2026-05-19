import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from '../api/requests/ProductRequests';
import { automationexercise } from '../../pages/AutomationPage';

test('Verify brands API matches UI', async ({ request, page }) => {
    const automationPage = new automationexercise(page);
    const api = new ProductRequests(request);

    const response = await api.getAllBrandsList();
    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.brands).toBeTruthy();
    expect(body.brands.length).toBeGreaterThan(0);

    const firstBrandName = body.brands[0].brand;

    await automationPage.launchAndConsent();
    await automationPage.navigateToProducts();

    const productLocator = page.getByText(firstBrandName).first();
    await productLocator.scrollIntoViewIfNeeded();

    await expect(productLocator).toBeVisible();
});