import { Page } from '@playwright/test';
import {faker} from '@faker-js/faker';

export class CardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async Card() {
  
    await this.page.fill('[name="name_on_card"]', faker.person.fullName());
    await this.page.fill('[name="card_number"]', faker.finance.creditCardNumber());
    await this.page.fill('[name="cvc"]', faker.finance.creditCardCVV());
    await this.page.fill('[name="expiry_month"]', faker.date.month());
    await this.page.fill('[name="expiry_year"]', faker.date.future().getFullYear().toString());

    await this.page.click('button:has-text("Pay and Confirm Order")');
  }
}
