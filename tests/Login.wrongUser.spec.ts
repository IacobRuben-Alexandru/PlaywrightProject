import {test} from "../fixtures/userFixture";
import { expect} from "@playwright/test";
import {ReachLoginPage} from "../pages/LoginPage";
import {ConsentPage} from "../pages/ConsentPage";

test("Login with random user", async ({page, randomUser})=>{
    const loginPage = new ReachLoginPage(page);
    const consentPage = new ConsentPage(page);
    await loginPage.goto();
    await loginPage.load();
    consentPage.giveConsent();
    await loginPage.login(randomUser.email, randomUser.password);
    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
});