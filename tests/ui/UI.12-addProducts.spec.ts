import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { automationexercise } from '../../pages/AutomationPage';

test('Add products to cart', async ({ page }) => {
  const automationPage = new automationexercise(page);
  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });
  await test.step("Click on 'Products' and add 2 products to cart", async () => {
    await automationPage.navigateToProducts();
    await automationPage.addProductToCartByIndex(0);
    await automationPage.addProductToCartByIndex(1);
  });
  await test.step('Navigate to cart and verify both products were added', async () => {
    await automationPage.navigateToCart();
    await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
    await expect(page.getByText('Rs.').first()).toHaveText('Rs. 500');
    await expect(page.getByText('Rs.').nth(2)).toHaveText('Rs. 400');
    await expect(
      page
        .getByRole('row', { name: 'Product Image Blue Top Women' })
        .getByRole('button'),
    ).toHaveText('1');
    await expect(
      page
        .getByRole('row', { name: 'Product Image Men Tshirt Men' })
        .getByRole('button'),
    ).toHaveText('1');
  });
});
