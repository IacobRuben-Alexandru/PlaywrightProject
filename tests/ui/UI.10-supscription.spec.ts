import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { USERS } from '../../config/constants';
import { automationexercise } from '../../pages/AutomationPage';

test('Supscription', async ({ page }) => {
  const automationPage = new automationexercise(page);

  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });
  await test.step("Scroll down to 'Subscription' section and subscribe", async () => {
    const Supscription = page.getByRole('heading', { name: 'Subscription' });
    await Supscription.scrollIntoViewIfNeeded();
    await expect(Supscription).toBeVisible();
    await page
      .getByRole('textbox', { name: 'Your email address' })
      .fill(USERS.email1);
    await page.locator('button#subscribe').click();
    await expect(
      page.getByText('You have been successfully subscribed!'),
    ).toBeVisible();
  });
});
