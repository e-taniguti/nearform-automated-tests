import { Page } from "@playwright/test";
import { injectAxe, checkA11y } from 'axe-playwright';

export class Utils {
    // Types definition
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    };

    async visit(url: string) {
        await this.page.goto(url);
        await this.page.click('button:has-text("All looks good")');    
    };

    async pageAccessibilityCheck(content: Page) {
        await injectAxe(content);
        await checkA11y(content, null, {
          detailedReport: true,
          detailedReportOptions: {
            html: true
          } 
        });  
    }
};