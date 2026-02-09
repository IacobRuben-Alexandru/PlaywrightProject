import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";

test("Add Review", async ({page})=>{
    const automationPage = new automationexercise(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Navigate to products, click on 'View Product' and add review", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await automationPage.addReview();
        await expect(page.getByText('Thank you for your review.')).toBeVisible();
    });
});