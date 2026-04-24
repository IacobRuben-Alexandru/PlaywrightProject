import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { RegisterAnAccountPage } from '../../pages/RegisterPage';
import { USERS } from '../../config/constants';

test('Register with an existing account', async ({ page }) => {
  const registerPage = new RegisterAnAccountPage(page);
  await test.step('Launch browser and navigate to register page', async () => {
    await registerPage.launchAndConsent();
  });
  await test.step('Attempt to register with an existing account', async () => {
    await registerPage.registerWithExistingAccount(USERS.name1, USERS.email1);
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
  });
});
