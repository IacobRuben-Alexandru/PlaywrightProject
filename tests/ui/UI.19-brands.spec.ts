import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";

test("Brands", async ({page})=>{
    const automationPage = new automationexercise(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Navigate to products and verify brands", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
        await page.getByRole('link', { name: '(6) Polo' }).click();
        await expect(page.getByRole('heading', { name: 'Brand - Polo Products'})).toBeVisible();
        await page.getByRole('link', { name: '(5) H&M' }).click();
        await expect(page.getByRole('heading', { name: 'Brand - H&M Products'})).toBeVisible();
    });
});