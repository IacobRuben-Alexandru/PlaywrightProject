import { test } from '../../fixtures/createuserFixture';
import { expect } from '@playwright/test';
import { RegisterAnAccountPage } from '../../pages/RegisterPage';
import { automationexercise } from '../../pages/AutomationPage';
import { CardPage } from '../../pages/CardPage';
import { faker } from '@faker-js/faker'

test('Download Invoice', async ({ page }) => {
  const registerPage = new RegisterAnAccountPage(page);
  const primary = new automationexercise(page);
  const card = new CardPage(page);
  await test.step('Launch browser and navigate to home page', async () => {
    await primary.launchAndConsent();
  });
  await test.step('Add product to cart and proceed to checkout', async () => {
    await primary.navigateToProducts();
    await primary.addProductToCartByIndex(0);
  });
  await test.step('Navigate to cart and checkout', async () => {
    await page.goto('https://automationexercise.com/view_cart');
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await page.getByText('Proceed To Checkout').click();
  });
  const Email = faker.internet.email();
  const Name = faker.person.fullName();
  const Password = faker.internet.password().toString();
  await test.step('Register new user during checkout', async () => {
    await page.getByRole('link', { name: 'Register / Login' }).click();
    await registerPage.register(Name, Email,Password);
    await expect(page.locator('h2[data-qa="account-created"]')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
    await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
  });
  await test.step('Navigate to cart and place order', async () => {
    await primary.navigateToCart();
    await expect(page.getByText('Shopping Cart')).toBeVisible();
    await primary.checkOutandPlaceOrder();
  });
  await test.step('Fill in card details', async () => {
    await card.Card();
    await expect(page.locator('h2[data-qa="order-placed"]')).toBeVisible();
  });
  await test.step('Download invoice and delete account', async () => {
    await primary.downloadInvoice();
    await primary.deleteAccount();
  });
});
