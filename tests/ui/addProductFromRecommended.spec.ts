import {test} from "../../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {automationexercise} from "../../pages/AutomationPage";

test("Add products from recommended", async ({page})=>{
    const automationPage = new automationexercise(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.launchAndConsent();
    });
    await test.step("Scroll to bottom of page", async ()=> {
        const Recommended = page.getByRole('heading', { name: 'recommended items' });
        await Recommended.scrollIntoViewIfNeeded();
        await expect(Recommended).toBeVisible();
    });
    await test.step("Add product from recommended to cart and verify that product is displayed in cart", async ()=> {
        const targetButton = page.locator('.item > div > .product-image-wrapper > .single-products > .productinfo > .btn').first();
        const nextCarouselButton = page.locator('a[data-slide="next"][href="#recommended-item-carousel"]');
        while (!(await targetButton.isVisible())) {
            await nextCarouselButton.click();
            await page.waitForTimeout(500);
        }
        await targetButton.click();
        await automationPage.viewCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    });
});