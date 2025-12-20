import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Brands", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await automationPage.goto();
    await automationPage.load();
    await consentPage.giveConsent();
    await expect(page).toHaveURL(URL);
    await automationPage.navigateToProducts();
    await expect(page.getByRole('heading', { name: 'Brands' })).toBeVisible();
    await page.getByRole('link', { name: '(6) Polo' }).click();
    await expect(page.getByRole('heading', { name: 'Brand - Polo Products'})).toBeVisible();
    await page.getByRole('link', { name: '(5) H&M' }).click();
    await expect(page.getByRole('heading', { name: 'Brand - H&M Products'})).toBeVisible();
    
});