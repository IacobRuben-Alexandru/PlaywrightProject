import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Add products to cart", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await automationPage.goto();
    await automationPage.load();
    await consentPage.giveConsent();
    await expect(page).toHaveURL(URL);
    await automationPage.navigateToProducts();
    const product = page.locator('[class="product-image-wrapper"]');
    const firstProduct = product.first();
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.hover();
    await page.getByText('Add to cart').nth(0).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    const secondProduct = product.nth(1); 
    await secondProduct.scrollIntoViewIfNeeded();
    await secondProduct.hover()
    await page.getByText('Add to cart').nth(3).click();
    await page.getByRole('button', { name: 'Continue Shopping' }).click();
    await automationPage.navigateToCart();
    await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
});
