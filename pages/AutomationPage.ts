import { Page, expect } from '@playwright/test';
import { URL, PATHS, FileInput } from '../config/constants';
import { ConsentPage } from './ConsentPage';
import { faker } from '@faker-js/faker'


export class automationexercise {
  readonly page: Page;
  readonly consentPage: ConsentPage;

  constructor(page: Page, consentPage: ConsentPage = new ConsentPage(page)) {
    this.page = page;
    this.consentPage = consentPage;
  }
  async goto() {
    await this.page.goto(`${URL}`);
  }
  async gotoContactUs() {
    await this.page.goto(`${URL}${PATHS.contactUs}`);
  }
  async load() {
    await this.page.waitForLoadState('load');
  }
  async fillContactForm() {
    this.page.on('dialog', async (dialog) => {
      console.log(`Mesaj dialog: ${dialog.message()}`);
      await dialog.accept();
    });
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(faker.person.fullName());
    await this.page
      .getByRole('textbox', { name: 'Email', exact: true })
      .click();
    await this.page
      .getByRole('textbox', { name: 'Email', exact: true })
      .fill(faker.internet.email());
    await this.page
      .getByRole('textbox', { name: 'Subject', exact: true })
      .click();
    await this.page
      .getByRole('textbox', { name: 'Subject', exact: true })
      .fill('Test Subject');
    await this.page
      .getByRole('textbox', { name: 'Your Message Here', exact: true })
      .click();
    await this.page
      .getByRole('textbox', { name: 'Your Message Here', exact: true })
      .fill('This is a test!');
    const fileInput = this.page.locator(FileInput.fileInput);
    await fileInput.waitFor({ state: 'attached' });
    await fileInput.setInputFiles(PATHS.file);
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
  async addProductToCartByIndex(index: number) {
    await this.consentPage.giveConsent();
    const product = this.page.locator('.product-image-wrapper').nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.hover();

    const addToCartBtn = product.locator('.product-overlay a.add-to-cart');

    await expect(addToCartBtn).toBeVisible({ timeout: 2000 });
    await addToCartBtn.click();

    await this.continueShopping();
  }
  async navigateToProducts() {
    await this.page.locator('a[href="/products"]').click();
    await this.load();
    //await this.hideAds();
  }
  async navigateToCart() {
    await this.page.locator('a[href="/view_cart"]').first().click();
    await this.load();
    //await this.hideAds();
  }
  async downloadInvoice() {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.page.getByRole('link', { name: 'Download Invoice' }).click(),
    ]);
    const filePath = './test-results/temp-invoice.pdf';
    await download.saveAs(filePath);
    expect(download).toBeTruthy();
  }
  async continueShopping() {
    const continueBtn = this.page.getByRole('button', {
      name: 'Continue Shopping',
    });
    try {
      await continueBtn.waitFor({ state: 'visible', timeout: 5000 });
      await continueBtn.click({ force: true });
    } catch (e) {}
  }
  async viewCart() {
    const cartBtn = this.page.getByRole('link', { name: 'View Cart' });
    try {
      await cartBtn.waitFor({ state: 'visible', timeout: 5000 });
      await cartBtn.click({ force: true });
    } catch (e) {
      await this.navigateToCart();
    }
  }
  async hideAds() {
    await this.page.addStyleTag({
      content: `
                iframe,
                ins.adsbygoogle,
                .fc-consent-root,
                .fc-dialog-container {
                    display: none !important;
                }
            `,
    });
  }
  async addReview() {
    //await this.hideAds();
    await this.page.locator('a[href="/product_details/2"]').click();
    await this.page
      .getByRole('textbox', { name: 'Your Name' })
      .fill(faker.person.fullName());
    await this.page
      .getByRole('textbox', { name: 'Email Address', exact: true })
      .fill(faker.internet.email());
    await this.page
      .getByRole('textbox', { name: 'Add Review Here!' })
      .fill('Great product, highly recommend!');
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
  async deleteAccount() {
    await this.page.locator('a[href="/delete_account"]').click();
    await expect(this.page.getByText('Account Deleted!')).toBeVisible();
    await this.page.getByRole('link', { name: 'Continue' }).click();
  }
  async launchAndConsent() {
    await this.goto();
    await this.load();
    await this.consentPage.giveConsent();
    //await this.hideAds();
    await expect(this.page).toHaveURL(URL);
  }
  async checkOutandPlaceOrder() {
    await this.page.getByText('Proceed To Checkout').click();
    await expect(
      this.page.getByRole('heading', { name: 'Review Your Order' }),
    ).toBeVisible();
    const PlaceOrder = this.page.getByRole('link', { name: 'Place Order' });
    await PlaceOrder.evaluate((el) =>
      el.scrollIntoView({ behavior: 'instant', block: 'center' }),
    );
    await expect(PlaceOrder).toBeVisible();
    await this.page.getByRole('link', { name: 'Place Order' }).click();
  }
}
