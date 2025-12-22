import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Product category", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Navigate to products and verify categories", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await page.getByRole('link', { name: ' Women' }).click();
        await page.getByRole('link', { name: 'Dress' }).click();
        await expect(page.getByRole('heading', { name: 'Women - Dress Products'})).toBeVisible();
        await page.getByRole('link', { name: ' Women' }).click();
        await page.getByRole('link', { name: ' Men' }).click();
        await page.getByRole('link', { name: 'Jeans' }).click();
        await expect(page.getByRole('heading', { name: 'Men - Jeans Products'})).toBeVisible();
    });
});