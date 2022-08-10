import { Page } from "@playwright/test";

export class Utils {
    // Types definition
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    async navigateTo(url: string) {
        await this.page.goto(url);
        await this.page.click('button:has-text("All looks good")');    
    };
};