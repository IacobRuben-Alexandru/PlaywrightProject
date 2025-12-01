import { Page } from "@playwright/test";

export class ConsentPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async giveConsent() {
    const button = this.page.getByRole("button", { name: "Consent" });
    if (await button.isVisible()) {
      await button.click();
    }
  }
}
