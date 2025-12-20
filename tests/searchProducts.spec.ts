import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Search for products", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await automationPage.goto();
    await automationPage.load();
    await consentPage.giveConsent();
    await expect(page).toHaveURL(URL);
    await automationPage.navigateToProducts();
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Search Product' }).fill('Blue Top');
    await page.getByRole('button', { name: '' }).click();
    await expect(page.getByText('Searched Products')).toBeVisible();
    await expect(page.getByText('Blue Top').nth(1)).toBeVisible();
});