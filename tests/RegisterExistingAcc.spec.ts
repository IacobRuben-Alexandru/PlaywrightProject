import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS } from "../config/constants";
test("Register with an existing account", async ({page})=>{
    const registerPage = new RegisterAnAccountPage(page);
    const consentPage = new ConsentPage(page);
    await registerPage.goto();
    await registerPage.load();
    await consentPage.giveConsent();
    await registerPage.registerWithExistingAccount(USERS.name1, USERS.email1);
    await expect(page.getByText("Email Address already exist!")).toBeVisible();
});