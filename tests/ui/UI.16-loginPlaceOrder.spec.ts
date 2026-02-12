import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import { automationexercise} from "../../pages/AutomationPage";
import { USERS } from "../../config/constants";
import { CardPage } from "../../pages/CardPage";
import { ReachLoginPage } from "../../pages/LoginPage";

test("Login then place an order", async ({page})=>{
    test.setTimeout(90000);
    const primary = new automationexercise(page);
    const card = new CardPage(page);
    const loginPage = new ReachLoginPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await primary.launchAndConsent();
    });
    await test.step("Navigate to login page and login", async ()=> {
        await loginPage.launchAndConsent();
        await loginPage.login(USERS.email1, USERS.password);
        await expect(page.getByText(`Logged in as ${USERS.name1}`)).toBeVisible();
    });
    await test.step("Navigate to products and add a product to cart", async ()=> {
        await primary.navigateToProducts();
        await primary.addProductToCartByIndex(0);
    });
    await test.step("Navigate to cart and checkout", async ()=> {
        await primary.navigateToCart();
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await primary.checkOutandPlaceOrder();
    });
    await test.step("Fill in card details and place order", async ()=> {
        await card.Card();
        await expect(page.locator('h2[data-qa="order-placed"]')).toBeVisible();
    });
});