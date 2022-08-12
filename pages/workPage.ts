import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";


export class WorkPage {
    // Types definition
    readonly page: Page;
    readonly breadCrumb: Locator;
    readonly breadCrumbLinks: Locator;
    readonly cardLinks: Locator;
    readonly paragraphs: Locator;
    readonly readStoryButtons: Locator;
    readonly subTitles: Locator;
    readonly title: Locator;
    readonly titleParagraph: Locator;

    constructor(page: Page) {
        this.page = page;
        this.breadCrumb = page.locator('.fusion-breadcrumbs');
        this.cardLinks = page.locator('.awb-gallery-wrapper >> a');
        this.paragraphs = page.locator('#content >> .fusion-text > p');
        this.readStoryButtons = page.locator('a:has-text("Read the Story")');
        this.subTitles = page.locator('#content >> [class ^= "title-heading"]');
        this.title = page.locator('.fusion-page-title-bar >> h1');
        this.titleParagraph = page.locator('.fusion-page-title-bar >> p');

        this.breadCrumbLinks = this.breadCrumb.locator('a');

    };

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(results.workTitle);
    };

    async assertBreadcrumb() {
        await expect(this.breadCrumb).toHaveText(results.pages.work.breadcrumb);
    };

    async assertBreadcrumbLinks() {
        // TODO - need to check with dev team if the url should have a "/" at the end or not
        // TODO - link at the logo has the "/"
        await expect(this.breadCrumbLinks).toHaveAttribute('href', results.links.nearform.replace(/\/$/, ""));
    };

    async assertTitles() {
        await expect(this.title).toHaveText(results.pages.work.title);         
        await expect(this.subTitles).toHaveText(results.pages.work.subTitles);         
    };

    async assertParagraphs() {
        await expect(this.titleParagraph).toHaveText(results.pages.work.titleParagraph);         
        await expect(this.paragraphs).toHaveText(results.pages.work.paragraphs);      
    };

    async assertReadStoryButtons() {
        await expect(this.readStoryButtons.nth(0)).toBeVisible();
        await expect(this.readStoryButtons.nth(0)).toHaveAttribute('href', results.links.renalytix);
        await expect(this.readStoryButtons.nth(1)).toBeVisible();
        await expect(this.readStoryButtons.nth(1)).toHaveAttribute('href', results.links.treedom);
    };

    async assertCardLinks() {
        const length = await this.cardLinks.count();
        for (let i = 0; i < length; i++) {
            await expect(this.cardLinks.nth(i)).toHaveAttribute('href', results.pages.work.cardLinks[i]);
        };
    };

};