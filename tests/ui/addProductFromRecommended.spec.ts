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
        const nextCarouselButton = page.locator('#recommended-item-carousel').getByRole('link', { name: '' });
        while (!(await targetButton.isVisible())) {
            await nextCarouselButton.click();
            await page.waitForTimeout(500);
        }
        await targetButton.click();
        await automationPage.viewCart();
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    });
});
//     [chromium] › tests/ui/addReview.spec.ts:5:5 › Add Review ───────────────────────────────────────
//     [chromium] › tests/ui/allProducts.spec.ts:5:5 › Navigate to All Products ───────────────────────
//     [chromium] › tests/ui/brands.spec.ts:5:5 › Brands ──────────────────────────────────────────────
//     [chromium] › tests/ui/categoryProduct.spec.ts:5:5 › Product category ───────────────────────────
//     [chromium] › tests/ui/quantityTest.spec.ts:6:5 › Quantity Test ─────────────────────────────────
//     [firefox] › tests/ui/categoryProduct.spec.ts:5:5 › Product category ────────────────────────────
//   1 flaky
//     [chromium] › tests/ui/LogoutTest.spec.ts:6:5 › Logout test ─────────────────────────────────────
