import { expect } from "@playwright/test";
import { automationexercise } from "../../pages/AutomationPage";
import { test } from "../../fixtures/createuserFixture";

test("Scroll up and down using functionality", async ({ page }) => {
    const automationPage = new automationexercise(page);

    await test.step("Launch browser and navigate to home page", async () => {
        await automationPage.launchAndConsent();
    });

    await test.step("Scroll down to Subscription section", async () => {
        const subscriptionHeader = page.getByRole('heading', { name: 'Subscription' });

        await subscriptionHeader.scrollIntoViewIfNeeded();

        await expect(subscriptionHeader).toBeInViewport();
    });

    await test.step("Scroll up using 'Scroll Up' button", async () => {
        const scrollUpButton = page.locator('#scrollUp');
        await expect(scrollUpButton).toBeVisible();

        await scrollUpButton.click();

        await page.waitForFunction(() => window.scrollY === 0);

        const topText = page
            .getByRole('heading', { name: 'Full-Fledged practice website' })
            .first();

        await expect(topText).toBeVisible();
        await expect(topText).toBeInViewport();
    });
});
