import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { RegisterAnAccountPage } from '../../pages/RegisterPage';
import { ConsentPage } from '../../pages/ConsentPage';
import { ReachLoginPage } from '../../pages/LoginPage';
import { automationexercise } from '../../pages/AutomationPage';
import { faker } from '@faker-js/faker'

test('Loggin with correct user', async ({ page }) => {
  const registerPage = new RegisterAnAccountPage(page);
  const loginPage = new ReachLoginPage(page);
  const automationPage = new automationexercise(page);
  await test.step('Launch browser and navigate to register page', async () => {
    await registerPage.launchAndConsent();
  });
  const Email = faker.internet.email();
  const Name = faker.person.fullName();
  const Password = faker.internet.password().toString();
  await test.step('Register a new user account and logout', async () => {
    await registerPage.register(Name, Email,Password);
    await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.locator('a[href="/logout"]').click();
  });
  await test.step('Login with registered user credentials and delete account', async () => {
    await loginPage.launchAndConsent();
    await loginPage.login(Email, Password);
    await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
    await automationPage.deleteAccount();
  });
});
