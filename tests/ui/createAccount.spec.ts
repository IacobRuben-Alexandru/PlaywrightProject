import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../../pages/RegisterPage";
import { automationexercise } from "../../pages/AutomationPage";

test("Create account", async ({page, randomUser})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const automationPage = new automationexercise(page);
    await test.step("Launch browser and navigate to register page", async ()=> {
        await registerPage.launchAndConsent();
    });
    const Email = randomUser.email;
    const Name = randomUser.name;
    await test.step("Register a new user account", async ()=> {
        await registerPage.register(Name, Email);
        await expect(page.locator('b')).toContainText('Account Created!');
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
        await automationPage.deleteAccount();
    });
});