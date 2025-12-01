import {Page} from "@playwright/test";
import {URL, PATHS} from "../config/constants";

export class ReachLoginPage{
    readonly page: Page;

    constructor(page: Page)
    {
        this.page = page;
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
}