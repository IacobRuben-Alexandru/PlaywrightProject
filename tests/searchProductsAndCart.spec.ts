import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import { USERS } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";
import { ReachLoginPage } from "../pages/LoginPage";
test("Search for products", async ({page})=>{
    test.setTimeout(90000);
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    const loginPage = new ReachLoginPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Add products to cart and verify in cart before and after login", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
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
        const secondProduct = product.nth(1); 
        await secondProduct.scrollIntoViewIfNeeded();
        await secondProduct.hover()
        await page.getByText('Add to cart').nth(3).click();
        try {
            await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
            await continueBtn.click({ force: true });
        } catch (e) {}
        await automationPage.navigateToCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        await test.step("Login and verify products remain in cart", async ()=> {
            await loginPage.goto();
            await loginPage.load();
            await consentPage.giveConsent();
            await loginPage.login(USERS.email1,USERS.password);
            await expect(page.getByText(`Logged in as ${USERS.name1}`)).toBeVisible();
            await automationPage.navigateToCart();
            await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
            await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        });
    });

});