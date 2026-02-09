import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";
import {test} from "../../fixtures/createuserFixture";

test("Scroll down", async ({page})=>{
    const automationPage = new automationexercise(page);

    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    const subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });
    await test.step("Scroll down using keyboard arrows", async ()=> {
        let isVisibleInViewport = false;
        while (isVisibleInViewport === false) {
            for(let i = 0; i < 3; i++) {
                await page.keyboard.press('ArrowDown');
            }
            await page.waitForTimeout(20);
            isVisibleInViewport = await subscriptionHeader.evaluate((el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );});
            
        }
        await expect(subscriptionHeader).toBeVisible();
    });
    await test.step("Scroll up using keyboard arrows", async ()=> {
        await expect(subscriptionHeader).toBeVisible();
        const topText = page.getByRole('heading', { name: 'Full-Fledged practice website' }).first();
        let isTopVisible = false;
        while (!isTopVisible) {
            for(let i = 0; i < 3; i++) {
                await page.keyboard.press('ArrowUp');
            }
            await page.waitForTimeout(20);
            isTopVisible = await topText.evaluate((el) => {
                const rect = el.getBoundingClientRect();
                return rect.top >= 0 && rect.top <= window.innerHeight;
            });
            
        }
        await expect(topText).toBeVisible();
    });
});