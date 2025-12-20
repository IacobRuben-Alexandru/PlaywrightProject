import { expect, Page } from "@playwright/test";
import { randomNumber, randomString, generateRandomPassword } from "../utils/helpers";
export class CardPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async Card() {
    await this.page.locator('input[name="name_on_card"]').click();
    await this.page.locator('input[name="name_on_card"]').fill(randomString(randomNumber()) + ' ' + randomString(randomNumber()));
    await this.page.locator('input[name="card_number"]').click();
    await this.page.locator('input[name="card_number"]').fill('4111111111111111');
    await this.page.getByRole('textbox', { name: 'ex.' }).click();
    await this.page.getByRole('textbox', { name: 'ex.' }).fill('123');
    await this.page.getByRole('textbox', { name: 'MM' }).click();
    await this.page.getByRole('textbox', { name: 'MM' }).fill('12');
    await this.page.getByRole('textbox', { name: 'YYYY' }).click();
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill('2025');
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
    await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();
  }
}
