import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ReachLoginPage} from "../../pages/LoginPage";
import { USERS } from "../../config/constants";

test("Logout test", async ({page})=>{
    const loginPage = new ReachLoginPage(page);
    await test.step("Navigate to login page and login", async ()=> {
        await loginPage.launchAndConsent();
        await loginPage.login(USERS.email1, USERS.password);
        await expect(page.getByText(`Logged in as ${USERS.name1}`)).toBeVisible();
    });
    await test.step("Logout and verify redirection to login page", async ()=> {
        await page.getByRole('link', { name: ' Logout' }).click();
        await expect(page).toHaveURL(/.*login/);
    });
});