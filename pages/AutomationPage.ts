import {Page} from "@playwright/test";
import {URL, PATHS, FileInput} from "../config/constants";

export class automationexercise{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
    }
    async goto(){
        await this.page.goto(`${URL}`);
    }
    async gotoContactUs(){
        await this.page.goto(`${URL}${PATHS.contactUs}`);
    }
    async load()
    {
        await this.page.waitForLoadState('load');
    }
    async fillContactForm(name: string, email: string, message: string)
    {
        this.page.on('dialog', async dialog => {
            console.log(`Mesaj dialog: ${dialog.message()}`);
            await dialog.accept();
        });
        await this.page.getByRole("textbox", { name: "Name" }).click();
        await this.page.getByRole("textbox", { name: "Name" }).fill(name);
        await this.page.getByRole("textbox", { name: "Email", exact: true }).click();
        await this.page.getByRole("textbox", { name: "Email", exact: true }).fill(email);
        await this.page.getByRole("textbox", { name: "Subject", exact: true }).click();
        await this.page.getByRole("textbox", { name: "Subject", exact: true }).fill("Test Subject");
        await this.page.getByRole('textbox', { name: 'Your Message Here', exact: true }).click();
        await this.page.getByRole("textbox", { name: "Your Message Here", exact: true }).fill(message);
        const fileInput = this.page.locator(FileInput.fileInput);
        await fileInput.waitFor({ state: 'attached' });
        await fileInput.setInputFiles(PATHS.file);
        await this.page.getByRole("button", { name: "Submit" }).click();
    }
    async navigateToProducts(){
        await this.page.getByRole('link', { name: ' Products' }).click();
    }
    async navigateToCart(){
        await this.page.getByRole('link', { name: ' Cart' }).click();
    }
}