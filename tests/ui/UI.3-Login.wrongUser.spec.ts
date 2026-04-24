import { test } from '../../fixtures/userFixture';
import { expect } from '@playwright/test';
import { ReachLoginPage } from '../../pages/LoginPage';
import { faker } from '@faker-js/faker'
test('Login with innexistent user', async ({ page }) => {
  const loginPage = new ReachLoginPage(page);
  await test.step('Launch browser and navigate to login page', async () => {
    await loginPage.launchAndConsent();
  });
  await test.step('Attempt to login with innexistent user credentials', async () => {
    await loginPage.login(faker.internet.email(), faker.internet.password());
    await expect(
      page.getByText('Your email or password is incorrect!'),
    ).toBeVisible();
  });
});
