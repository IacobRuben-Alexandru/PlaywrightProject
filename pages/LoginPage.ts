import {Page, expect} from "@playwright/test";
import {URL, PATHS} from "../config/constants";
import {ConsentPage} from "./ConsentPage";
export class ReachLoginPage{
    readonly page: Page;
    readonly consentPage: ConsentPage;

    constructor(page: Page, consentPage: ConsentPage=new ConsentPage(page))
    {
        this.page = page;
        this.consentPage = consentPage;
    }
    async goto(){
        await this.page.goto(`${URL}${PATHS.login}`);
    }
    async load()
    {
        await this.page.waitForLoadState('load');
    }
    async login(username: string, password: string)
    {
        await this.page.getByRole("textbox", {name: "Email Address"}).first().fill(username);
        await this.page.getByRole("textbox", {name: "Password"}).fill(password);
        await this.page.getByRole("button", {name: "Login"}).click();
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
            `
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