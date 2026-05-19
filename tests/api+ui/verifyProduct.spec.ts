import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ProductRequests } from '../api/requests/ProductRequests';
import { automationexercise } from '../../pages/AutomationPage';
test('Verify products API matches UI', async ({ request, page }) => {
    const automationPage = new automationexercise(page);
    const api = new ProductRequests(request);
            
    const response = await api.getProductList();
    
    const body = await response.json();
    const firstProductName = body.products[0].name;

    await automationPage.launchAndConsent();
    await automationPage.navigateToProducts()

    const productLocator = page.getByText(firstProductName).first();
    await productLocator.scrollIntoViewIfNeeded();

    await expect(productLocator).toBeVisible();
});
