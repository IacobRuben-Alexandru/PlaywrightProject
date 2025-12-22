import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {ConsentPage} from "../pages/ConsentPage";
import { USERS,URL } from "../config/constants";
import {automationexercise} from "../pages/AutomationPage";

test("Add products from recommended", async ({page})=>{
    const automationPage = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await automationPage.goto();
        await automationPage.load();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
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
        const cartBtn = page.getByRole('link', { name: 'View Cart' });
        try {    
            await cartBtn.waitFor({ state: 'visible', timeout: 5000 });
            await cartBtn.click({ force: true }); 
        } catch (e) {
        
            await automationPage.navigateToCart();
        }
        await expect(page.getByRole('link', { name: 'Blue Top' })).toBeVisible();
    });
});
