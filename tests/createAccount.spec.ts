import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";

test("Create account", async ({page, randomUser})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to register page", async ()=> {
        await registerPage.goto();
        await registerPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(/.*login/);
    });
    await test.step("Register a new user account", async ()=> {
        await registerPage.register(randomUser.name, randomUser.email);
        await expect(page.locator('b')).toContainText('Account Created!');
        await page.getByRole('link', { name: 'Continue' }).click();
        await page.getByRole('link', { name: ' Delete Account' }).click();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
});