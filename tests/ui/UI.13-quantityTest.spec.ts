import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { ConsentPage } from '../../pages/ConsentPage';
import { automationexercise } from '../../pages/AutomationPage';

test('Quantity Test', async ({ page }) => {
  const automationPage = new automationexercise(page);
  const consentPage = new ConsentPage(page);
  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });
  await test.step('Navigate to products and add a product with quantity 4 to cart', async () => {
    await automationPage.navigateToProducts();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await page.locator('a[href="/product_details/1"]').first().click();
    await expect(page).toHaveURL(/.*product_details/);
    await page.locator('#quantity').fill('4');
    await page.locator('[class="btn btn-default cart"]').click();
  });
  await test.step('Navigate to cart and verify that product quantity is 4', async () => {
    await consentPage.giveConsent();
    await automationPage.viewCart();
    await expect(page.getByRole('button', { name: '4' })).toBeVisible();
  });
});
