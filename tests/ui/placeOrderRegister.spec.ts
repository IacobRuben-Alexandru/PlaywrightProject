import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../../pages/RegisterPage";
import { automationexercise} from "../../pages/AutomationPage";
import { CardPage } from "../../pages/CardPage";

test("Place order then register", async ({page, randomUser})=>{
    test.setTimeout(90000);
    const registerPage = new RegisterAnAccountPage(page);
    const primary = new automationexercise(page);
    const card = new CardPage(page);

    await test.step("Launch browser and navigate to home page", async ()=> {
        await primary.launchAndConsent();
    });
    await test.step("Navigate to products and add a product to cart", async ()=> {
        await primary.navigateToProducts();
        await primary.addProductToCartByIndex(0);
    });
    const Email = randomUser.email;
    const Name = randomUser.name;
    await test.step("Navigate to cart and register while in cart", async ()=> {
        await primary.navigateToCart();
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
        await page.getByRole('link', { name: 'Register / Login' }).click();
        await registerPage.register(Name, Email);
        await expect(page.locator('b')).toContainText('Account Created!');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
    });
    await test.step("Navigate to cart and checkout", async ()=> {
        await primary.navigateToCart();
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await primary.checkOutandPlaceOrder();

    });
    await test.step("Fill in card details, place order, and delete account", async ()=> {
        await card.Card();
        await expect(page.getByText('Congratulations! Your order')).toBeVisible();
        await primary.deleteAccount();
    });
});