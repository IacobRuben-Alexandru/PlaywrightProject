import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { RegisterAnAccountPage } from '../../pages/RegisterPage';
import { ConsentPage } from '../../pages/ConsentPage';
import { ReachLoginPage } from '../../pages/LoginPage';
import { USERS } from '../../config/constants';
import { automationexercise } from '../../pages/AutomationPage';

test('Loggin with correct user', async ({ page, randomUser }) => {
  const registerPage = new RegisterAnAccountPage(page);
  const consentPage = new ConsentPage(page);
  const loginPage = new ReachLoginPage(page);
  const automationPage = new automationexercise(page);
  await test.step('Launch browser and navigate to register page', async () => {
    await registerPage.launchAndConsent();
  });
  const Email = randomUser.email;
  const Name = randomUser.name;
  await test.step('Register a new user account and logout', async () => {
    await registerPage.register(Name, Email);
    await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.locator('a[href="/logout"]').click();
  });
  await test.step('Login with registered user credentials and delete account', async () => {
    await loginPage.launchAndConsent();
    await loginPage.login(Email, USERS.password);
    await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
    await automationPage.deleteAccount();
  });
});
