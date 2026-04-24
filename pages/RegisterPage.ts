import { expect, Page } from '@playwright/test';
import { URL, PATHS } from '../config/constants';
import { faker } from '@faker-js/faker'
import { ConsentPage } from './ConsentPage';

export class RegisterAnAccountPage {
  readonly page: Page;
  readonly consentPage: ConsentPage;
  constructor(page: Page, consentPage: ConsentPage = new ConsentPage(page)) {
    this.page = page;
    this.consentPage = consentPage;
  }
  async goto() {
    await this.page.goto(`${URL}${PATHS.login}`);
  }
  async load() {
    await this.page.waitForLoadState('load');
  }
  async registerWithExistingAccount(name: string, email: string) {
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .click();
    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async register(name: string, email: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Name' }).click();
    await this.page.getByRole('textbox', { name: 'Name' }).fill(name);
    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .click();
    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
    await this.consentPage.giveConsent();
    await expect(
      this.page.getByText('Enter Account Information'),
    ).toBeVisible();
    await this.page.getByRole('textbox', { name: 'Password *' }).click();
    await this.page
      .getByRole('textbox', { name: 'Password *' })
      .fill(password);

    await this.page.getByRole('textbox', { name: 'First name *' }).click();
    await this.page.getByRole('textbox', { name: 'First name *' }).fill(name);
    await this.page.getByRole('textbox', { name: 'Last name *' }).click();
    await this.page
      .getByRole('textbox', { name: 'Last name *' })
      .fill(faker.person.lastName());
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(faker.location.streetAddress());
    const options = await this.page
      .getByLabel('Country *')
      .locator('option')
      .all();
    const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
    const randomValue = await options[randomIndex].getAttribute('value');

    await this.page.getByLabel('Country *').selectOption(randomValue);
    await this.page.getByRole('textbox', { name: 'State *' }).click();
    await this.page
      .getByRole('textbox', { name: 'State *' })
      .fill(faker.location.state());
    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
    await this.page
      .getByRole('textbox', { name: 'City * Zipcode *' })
      .fill(faker.location.city());
    await this.page.locator('#zipcode').click();
    await this.page.locator('#zipcode').fill(faker.location.zipCode());
    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).click();
    await this.page
      .getByRole('textbox', { name: 'Mobile Number *' })
      .fill(faker.phone.number());
    await this.page.getByRole('button', { name: 'Create Account' }).click();
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
  async launchAndConsent() {
    await this.goto();
    await this.load();
    await this.consentPage.giveConsent();
    //await this.hideAds();
    await expect(this.page).toHaveURL(/.*login/);
  }
}
