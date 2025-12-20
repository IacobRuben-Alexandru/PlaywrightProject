import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";
import {ReachLoginPage} from "../pages/LoginPage";
import { USERS } from "../config/constants";

test("Loggin with correct user", async ({page})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const consentPage = new ConsentPage(page);
    const loginPage = new ReachLoginPage(page);
    await registerPage.goto();
    await registerPage.load();
    await consentPage.giveConsent();
    await registerPage.register(USERS.name, USERS.email);
    await expect(page.locator('b')).toContainText('Account Created!');
    await page.getByRole('link', { name: 'Continue' }).click();
    await page.getByRole('link', { name: ' Logout' }).click();
    await loginPage.goto();
    await consentPage.giveConsent();
    await loginPage.login(USERS.email, USERS.password);
    await expect(page.getByText(`Logged in as ${USERS.name}`)).toBeVisible();
    await page.getByRole('link', { name: ' Delete Account' }).click();
    await page.getByText('Account Deleted!').isVisible();
    await page.getByRole('link', { name: 'Continue' }).click();
});