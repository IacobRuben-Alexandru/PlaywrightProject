import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";
import {USERS} from "../config/constants";

test("Add Review", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Navigate to products, click on 'View Product' and add review", async ()=> {
        await automationPage.navigateToProducts();
        await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();
        await page.getByRole('link', { name: ' View Product' }).first().click();
        await page.getByRole('textbox', { name: 'Your Name' }).click();
        await page.getByRole('textbox', { name: 'Your Name' }).fill(USERS.name1);
        await page.getByRole('textbox', { name: 'Email Address', exact: true }).click();
        await page.getByRole('textbox', { name: 'Email Address', exact: true }).fill(USERS.email1);
        await page.getByRole('textbox', { name: 'Add Review Here!' }).click();
        await page.getByRole('textbox', { name: 'Add Review Here!' }).fill('Great product, highly recommend!');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.getByText('Thank you for your review.')).toBeVisible();
    });
});