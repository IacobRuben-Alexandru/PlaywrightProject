import {test} from "../../fixtures/userFixture";
import { expect} from "@playwright/test";
import {ReachLoginPage} from "../../pages/LoginPage";

test("Login with innexistent user", async ({page, randomUser})=>{
    const loginPage = new ReachLoginPage(page);
    await test.step("Launch browser and navigate to login page", async ()=> {
        await loginPage.launchAndConsent();
    });
    await test.step("Attempt to login with innexistent user credentials", async ()=> {
        await loginPage.login(randomUser.email, randomUser.password);
        await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
    });
});