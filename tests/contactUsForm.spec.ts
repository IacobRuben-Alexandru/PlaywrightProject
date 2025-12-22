import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Contact Us form submission", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to Contact Us page", async ()=> {
        await automationPage.gotoContactUs();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(`${URL}/contact_us`);
    });
    await test.step("Fill contact us form and submit", async ()=> {
        await expect(page.getByRole('heading', { name: 'Get In Touch' })).toBeVisible();
        await automationPage.fillContactForm(USERS.name1, USERS.email1, 'Hello, this is a test message.');
        await expect(page.locator('#contact-page').getByText('Success!')).toBeVisible();
        await page.getByRole('link', { name: ' Home' }).click();
        await expect(page).toHaveURL(URL);
    });
});