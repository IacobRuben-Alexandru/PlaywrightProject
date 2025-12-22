import {test} from "../fixtures/createuserFixture";
import {expect} from "@playwright/test";
import {RegisterAnAccountPage} from "../pages/RegisterPage";
import {ConsentPage} from "../pages/ConsentPage";
import { automationexercise} from "../pages/AutomationPage";
import { USERS } from "../config/constants";
import { URL } from "../config/constants";
import { CardPage } from "../pages/CardPage";
test("Download Invoice", async ({page, randomUser})=>{
    test.setTimeout(90000);
    const registerPage = new RegisterAnAccountPage(page);
    const primary = new automationexercise(page);
    const consentPage = new ConsentPage(page);
    const card = new CardPage(page);
    await test.step("Launch browser and navigate to home page", async ()=> {
        await primary.goto();
        await consentPage.giveConsent();
        await expect(page).toHaveURL(URL);
    });
    await test.step("Add product to cart and proceed to checkout", async ()=> {
        await primary.navigateToProducts();
        const product = page.locator('[class="product-image-wrapper"]');
        const firstProduct = product.first();
        await firstProduct.scrollIntoViewIfNeeded();
        await firstProduct.hover();
        await page.getByText('Add to cart').first().click({ force: true });
        const [response] = await Promise.all([
            page.waitForResponse(resp =>
                resp.url().includes('/add_to_cart') && resp.status() === 200
            ),
            page.getByText('Add to cart').first().click({ force: true })
        ]);
    });
    await test.step("Navigate to cart and checkout", async ()=> {
        await page.goto('https://automationexercise.com/view_cart');
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
    });
    const Email = randomUser.email;
    const Name = randomUser.name;
    await test.step("Register new user during checkout", async ()=> {
        await page.getByRole('link', { name: 'Register / Login' }).click();
        await registerPage.register(Name, Email);
        await expect(page.getByText('Account Created!', { exact: true })).toBeVisible({ timeout: 10000 });
        await page.getByRole('link', { name: 'Continue' }).click();
        await expect(page.getByText(`Logged in as ${Name}`)).toBeVisible();
    });
    await test.step("Navigate to cart and checkout", async ()=> {
        await primary.navigateToCart();
        await expect(page.getByText('Shopping Cart')).toBeVisible();
        await page.getByText('Proceed To Checkout').click();
    });
    await test.step("Fill in card details and place order", async ()=> {
        const PlaceOrder = page.getByRole('link', { name: 'Place Order' });
        await PlaceOrder.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await expect(PlaceOrder).toBeVisible();
        await page.getByRole('link', { name: 'Place Order' }).click();
        await card.Card();
        await expect(page.getByText('Congratulations! Your order')).toBeVisible();
    });
    await test.step("Download invoice and delete account", async ()=> {
        const downloadPromise = page.waitForEvent('download');
        await page.getByRole('link', { name: 'Download Invoice' }).click();
        const download = await downloadPromise;
        const filePath = './test-results/temp-invoice.pdf';
        await download.saveAs(filePath);
        expect(download).toBeTruthy();
        await page.getByRole('link', { name: ' Delete Account' }).click();
        await expect(page.getByText('Account Deleted!')).toBeVisible();
        await page.getByRole('link', { name: 'Continue' }).click();
    });
});