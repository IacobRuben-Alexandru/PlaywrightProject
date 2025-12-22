import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Add products to cart", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Click on 'Products' and add 2 products to cart", async ()=> {
        await automationPage.navigateToProducts();
        const product = page.locator('[class="product-image-wrapper"]');
        const firstProduct = product.first();
        await firstProduct.scrollIntoViewIfNeeded();
        await firstProduct.hover();
        await page.getByText('Add to cart').nth(0).click();
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
        const secondProduct = page.locator('.product-image-wrapper').nth(1);
        await secondProduct.scrollIntoViewIfNeeded();
        await secondProduct.hover();
        await secondProduct.locator('a.add-to-cart').last().click(); 
        await page.getByRole('button', { name: 'Continue Shopping' }).click();
    });
    await test.step("Navigate to cart and verify both products were added", async ()=> {
        await automationPage.navigateToCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Men Tshirt' })).toBeVisible();
        await expect(page.getByText('Rs.').first()).toHaveText('Rs. 500');
        await expect(page.getByText('Rs.').nth(2)).toHaveText('Rs. 400');
        await expect(page.getByRole('row', { name: 'Product Image Blue Top Women' }).getByRole('button')).toHaveText('1');
        await expect(page.getByRole('row', { name: 'Product Image Men Tshirt Men' }).getByRole('button')).toHaveText('1');
    });
});
