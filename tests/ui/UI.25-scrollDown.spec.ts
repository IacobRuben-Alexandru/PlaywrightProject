import { expect } from '@playwright/test';
import { automationexercise } from '../../pages/AutomationPage';
import { test } from '../../fixtures/createuserFixture';

test('Scroll down and up using keyboard arrows', async ({ page }) => {
  test.setTimeout(90000);
  const automationPage = new automationexercise(page);

  await test.step('Launch browser and navigate to home page', async () => {
    await automationPage.launchAndConsent();
  });

  const subscriptionHeader = page.getByRole('heading', {
    name: 'Subscription',
  });
  const topText = page
    .getByRole('heading', { name: 'Full-Fledged practice website' })
    .first();

  await test.step('Scroll down to Subscription', async () => {
    let isVisible = false;
    while (!isVisible) {
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowDown');
      }
      await page.waitForTimeout(150);
      isVisible = await subscriptionHeader.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
    }
    await expect(subscriptionHeader).toBeVisible();
  });

  await test.step('Scroll up to Full-Fledged practice website', async () => {
    let isTopVisible = false;
    while (!isTopVisible) {
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowUp');
      }
      await page.waitForTimeout(150);
      isTopVisible = await topText.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      });
    }
    await expect(topText).toBeVisible();
  });
});
