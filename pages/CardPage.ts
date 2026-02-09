import { expect, Page } from "@playwright/test";
import { randomNumber, randomString, generateRandomPassword } from "../utils/helpers";
export class CardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async Card() {
    await this.page.evaluate(() => {
        (document.querySelector('[name="name_on_card"]') as HTMLInputElement).value = 'Test User';
        (document.querySelector('[name="card_number"]') as HTMLInputElement).value = '4111111111111111';
        (document.querySelector('[name="cvc"]') as HTMLInputElement).value = '123';
        (document.querySelector('[name="expiry_month"]') as HTMLInputElement).value = '12';
        (document.querySelector('[name="expiry_year"]') as HTMLInputElement).value = '2025';
    });

    await this.page.click('button:has-text("Pay and Confirm Order")');
}

}
