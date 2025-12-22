import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";
import {test} from "../fixtures/createuserFixture";

test("Scroll up", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Scroll down", async ()=> {
        const subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
        let isVisibleInViewport = false;
        while (isVisibleInViewport === false) {
            await page.keyboard.press('ArrowDown');
            isVisibleInViewport = await subscriptionHeader.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );});
            await page.waitForTimeout(50); 
        }
        await expect(subscriptionHeader).toBeVisible();
    });
    await test.step("Scroll up using 'Scroll Up' button", async ()=> {
        const topText = page.getByRole('heading', { name: 'Full-Fledged practice website' });
        const scrollUpButton = page.locator('#scrollUp');
        await scrollUpButton.click();
        await expect(topText).toBeVisible();
        await expect(topText).toBeInViewport();
    });
});