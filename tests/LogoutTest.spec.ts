import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import {ReachLoginPage} from "../pages/LoginPage";
import { USERS } from "../config/constants";

test("Logout test", async ({page})=>{
    const consentPage = new ConsentPage(page);
    const loginPage = new ReachLoginPage(page);
    await test.step("Navigate to login page and login", async ()=> {
        await loginPage.goto();
        await consentPage.giveConsent();
        await loginPage.login(USERS.email1, USERS.password);
        await expect(page.getByText(`Logged in as ${USERS.name1}`)).toBeVisible();
    });
    await test.step("Logout and verify redirection to login page", async ()=> {
        await page.getByRole('link', { name: ' Logout' }).click();
        await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible();
        await expect(page).toHaveURL(/.*login/);
    });
});