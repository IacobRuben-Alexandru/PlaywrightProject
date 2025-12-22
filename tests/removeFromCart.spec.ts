import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Remove product from cart", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Navigate to products, add two products to cart", async ()=> {
        await automationPage.navigateToProducts();
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
    });
    await test.step("Navigate to cart and remove one product and check if product is removed", async ()=> {
        await automationPage.navigateToCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        await page.locator('#product-2 > .cart_delete > .cart_quantity_delete').click();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).not.toBeVisible();
    });
});
