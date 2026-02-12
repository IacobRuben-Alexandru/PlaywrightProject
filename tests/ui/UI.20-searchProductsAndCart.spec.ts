import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import { USERS } from "../../config/constants";
import {automationexercise} from "../../pages/AutomationPage";
import { ReachLoginPage } from "../../pages/LoginPage";

test("Search for products", async ({page})=>{
    test.setTimeout(90000);
    const automationPage = new automationexercise(page);
    const loginPage = new ReachLoginPage(page);

    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Add products to cart and verify in cart before and after login", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await automationPage.addProductToCartByIndex(0);
        await automationPage.addProductToCartByIndex(1);
        await automationPage.navigateToCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        await test.step("Login and verify products remain in cart", async ()=> {
            await loginPage.launchAndConsent();
            await loginPage.login(USERS.email1,USERS.password);
            await expect(page.getByText(`Logged in as ${USERS.name1}`)).toBeVisible();
            await automationPage.navigateToCart();
            await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        });
    });

});