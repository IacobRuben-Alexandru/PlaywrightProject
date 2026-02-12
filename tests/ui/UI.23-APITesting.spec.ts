import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";

test("Navigate to API Testing", async ({page})=>{
    const automationPage = new automationexercise(page);
    
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Navigate to API Testing page", async ()=> {
        await page.locator('a[href="/api_list"]').first().click();
        await expect(page).toHaveURL(/.*api_list/);
    });
});