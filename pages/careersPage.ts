import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";


export class CareersPage {
    // Types definition
    readonly page: Page;
    readonly faqAnswers: Locator;
    readonly faqQuestions: Locator;
    readonly filterLabel: Locator;
    readonly filterOptions: Locator;
    readonly iframe: FrameLocator;
    readonly nearformersSayAuthors: Locator;
    readonly nearformersSayParagraphs: Locator;
    readonly nearformersSayTitles: Locator;
    readonly subTitles: Locator;
    readonly title: Locator;
    readonly values: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframe = page.frameLocator('#grnhse_iframe');
        this.faqAnswers = page.locator('#career-toggles >> p');
        this.faqQuestions = page.locator('#career-toggles >> h3');
        this.nearformersSayAuthors = page.locator('#content >> .fusion-content-boxes >> figcaption');
        this.nearformersSayParagraphs = page.locator('#content >> .fusion-content-boxes >> p');
        this.nearformersSayTitles = page.locator('#content >> .fusion-content-boxes >> h3');
        this.subTitles = page.locator('#content >> h2[class ^= "title-heading"]');
        this.title = page.locator('#content >> h1[class ^= "title-heading"]');
        this.values = page.locator('#content >> .fusion-text > p');

        this.filterLabel = this.iframe.locator('.filter-label');
        this.filterOptions = this.iframe.locator('#departments-select > option');
    };

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(results.careersTitle);
    };

    async assertTitles() {
        await expect(this.title).toHaveText(results.pages.careers.title);         
        await expect(this.subTitles).toHaveText(results.pages.careers.subTitles);         
    };

    async assertNFValues() {
        await expect(this.values).toHaveText(results.pages.careers.values);      
    };

    async assertNearFormersSay() {
        await expect(this.nearformersSayTitles).toHaveText(results.pages.careers.nfSayTitles);
        await expect(this.nearformersSayParagraphs).toHaveText(results.pages.careers.nfSayParagraphs);
        await expect(this.nearformersSayAuthors).toHaveText(results.pages.careers.nfSayAuthors);
    };

    async assertFAQ() {
        await expect(this.faqQuestions).toHaveText(results.pages.careers.faqQuestions);
        await expect(this.faqAnswers).toHaveText(results.pages.careers.faqAnswers);
    };

    async assertJobsFilter() {
        await expect(this.filterLabel).toHaveText(results.pages.careers.filterLabel);
        await expect(this.filterOptions).toHaveText(results.pages.careers.filterOptions);
    };

    async selectDept(dept: string) {
        await this.page.mouse.wheel(0, 500);
        await this.iframe.locator('#s2id_departments-select > a').click();
        await this.iframe.locator(`#select2List0 > li:has-text("${dept}")`).click();
    };

    async assertCardsByDept(dept: string) {
        let deptNumber = '';
        switch (dept) {
            case 'Delivery':
                deptNumber = '4004207003';
                break;
            case 'Sales':
                deptNumber = '4005136003';
                break;
            defaut:
                deptNumber = 'all';
                break;
        };
       
        await this.page.waitForTimeout(1000);
        const length = await this.iframe.locator(`div[department_id="${deptNumber}"]`).count();
        for (let i = 0; i < length; i++) {
            await expect(this.iframe.locator(`div[department_id="${deptNumber}"]`).nth(i)).toBeVisible();
        };
        
    };

};