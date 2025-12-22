import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";
import { automationexercise} from "../pages/AutomationPage";
import { USERS } from "../config/constants";
import { URL } from "../config/constants";
import { CardPage } from "../pages/CardPage";
test("Register an account then place an order", async ({page, randomUser})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const primary = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    const card = new CardPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await primary.goto();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    const Email = randomUser.email;
    const Name = randomUser.name;
    await test.step("Navigate to register page and register an account", async ()=> {
        await registerPage.goto();
        await registerPage.load();
        await consentPage.giveConsent();
        await registerPage.register(Name, Email);
        await expect(page.locator('b')).toContainText('Account Created!');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
    });
    await test.step("Navigate to products and add a product to cart", async ()=> {
        await primary.navigateToProducts();
        const product = page.locator('[class="product-image-wrapper"]');
        const firstProduct = product.first();
        await firstProduct.scrollIntoViewIfNeeded();
        await firstProduct.hover();
        await page.getByText('Add to cart').nth(0).click();
        const continueBtn = page.getByRole('button', { name: 'Continue Shopping' });
        try {
            await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
            await continueBtn.click({ force: true });
        } catch (e) {}
    });
    await test.step("Navigate to cart and checkout", async ()=> {
        await primary.navigateToCart();
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
        await expect(page.getByRole('button', { name: '1' })).toBeVisible();
        const PlaceOrder = page.getByRole('link', { name: 'Place Order' });
        await PlaceOrder.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await expect(PlaceOrder).toBeVisible();
        await page.getByRole('link', { name: 'Place Order' }).click();
    });
    await test.step("Fill in card details, place order, and delete account", async ()=> {
        await card.Card();
        await page.getByRole('link', { name: ' Delete Account' }).click();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
});