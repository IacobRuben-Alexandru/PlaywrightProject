import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { automationexercise } from '../../pages/AutomationPage';

test('Remove product from cart', async ({ page }) => {
  const automationPage = new automationexercise(page);

  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });
  await test.step('Navigate to products, add two products to cart', async () => {
    await automationPage.navigateToProducts();
    await automationPage.addProductToCartByIndex(0);
    await automationPage.addProductToCartByIndex(1);
  });
  await test.step('Navigate to cart and remove one product and check if product is removed', async () => {
    await automationPage.navigateToCart();
    await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    await page
      .locator('#product-2 > .cart_delete > .cart_quantity_delete')
      .click();
    await expect(
      page.getByRole('link', { name: 'Men Tshirt' }),
    ).not.toBeVisible();
  });
});
