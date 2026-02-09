import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";

test("Navigate to All Products", async ({page})=>{
    const automationPage = new automationexercise(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Navigate to products and verify 'All Products' is visible", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    });
    await test.step("Click on 'View Product' and verify product details", async ()=> {
        await page.getByRole('link', { name: ' View Product' }).first().click();
        await expect(page.getByText('Availability:')).toBeVisible();
        await expect(page.getByText('Condition:')).toBeVisible();
        await expect(page.getByText('Brand:')).toBeVisible();
    }); 
});