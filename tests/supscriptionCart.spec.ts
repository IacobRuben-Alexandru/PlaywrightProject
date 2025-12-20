import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Cart Supscription", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await automationPage.goto();
    await automationPage.load();
    await consentPage.giveConsent();
    await expect(page).toHaveURL(URL);
    await automationPage.navigateToCart();
    const Supscription = page.getByRole('heading', { name: 'Subscription' });
    await Supscription.scrollIntoViewIfNeeded();
    await expect(Supscription).toBeVisible();
    await page.getByRole('textbox', { name: 'Your email address' }).fill(USERS.email1);
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();
});
