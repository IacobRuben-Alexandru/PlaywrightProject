import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { automationexercise } from '../../pages/AutomationPage';

test('Product category', async ({ page }) => {
  const automationPage = new automationexercise(page);
  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });
  await test.step('Navigate to products and verify categories', async () => {
    await automationPage.navigateToProducts();
    await expect(
      page.getByRole('heading', { name: 'All Products' }),
    ).toBeVisible();
    await page.click('a[data-toggle="collapse"][href="#Women"]');
    await page.getByRole('link', { name: 'Dress' }).click();
    await expect(
      page.getByRole('heading', { name: 'Women - Dress Products' }),
    ).toBeVisible();
    await page.click('a[data-toggle="collapse"][href="#Women"]');
    await page.click('a[data-toggle="collapse"][href="#Men"]');
    await page.getByRole('link', { name: 'Jeans' }).click();
    await expect(
      page.getByRole('heading', { name: 'Men - Jeans Products' }),
    ).toBeVisible();
  });
});
