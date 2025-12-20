import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Navigate to All Products", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await automationPage.goto();
    await automationPage.load();
    await consentPage.giveConsent();
    await expect(page).toHaveURL(URL);
    await automationPage.navigateToProducts();
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await page.getByRole('link', { name: ' View Product' }).first().click();
    await expect(page.getByText('Availability:')).toBeVisible();
    await expect(page.getByText('Condition:')).toBeVisible();
    await expect(page.getByText('Brand:')).toBeVisible();
});