import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Navigate to Test Cases", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Navigate to Test Cases page", async ()=> {
        await page.getByRole('button', { name: 'Test Cases' }).click();
        await expect(page).toHaveURL(/.*test_cases/);
    });
});