import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";

test("Create account", async ({page, randomUser})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const consentPage = new ConsentPage(page);
    await registerPage.goto();
    await registerPage.load();
    await consentPage.giveConsent();
    await registerPage.register(randomUser.name, randomUser.email);
    await expect(page.locator('b')).toContainText('Account Created!');
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await expect(page.getByText('Account Deleted!')).toBeVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
});