import { expect, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";

export class HomePage {
    // Types definition
    readonly page: Page;
    readonly applyNowButton: Locator;
    readonly blogTexts: Locator;
    readonly blogTitles: Locator;
    readonly contentBoxParagraphs: Locator;
    readonly learnMoreButton: Locator;
    readonly paragraphs: Locator;
    readonly readMoreButtons: Locator;
    readonly titles: Locator;
    readonly viewBlogButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.applyNowButton = page.locator('a:has-text("Apply Now")');
        this.blogTexts = page.locator('#content >> .fusion-blog-shortcode >> p');
        this.blogTitles = page.locator('#content >> .fusion-blog-shortcode >> h2');
        this.contentBoxParagraphs = page.locator('#content >> .fusion-content-boxes >> p');
        this.learnMoreButton = page.locator('a:has-text("Learn More")');
        this.paragraphs = page.locator('#content >> .fusion-text > p');
        this.readMoreButtons = page.locator('a:has-text("Read More")');
        this.titles = page.locator('#content >> [class ^= "title-heading"]');
        this.viewBlogButton = page.locator('a:has-text("View the Blog")');
    };

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(results.homeTitle);
    }

    async assertTitles() {
        await expect(this.titles).toHaveText(results.pages.home.titles);      
    };

    async assertParagraphs() {
        await expect(this.paragraphs).toHaveText(results.pages.home.paragraphs);      
    };

    async assertContentBoxParagraphs() {
        await expect(this.contentBoxParagraphs).toHaveText(results.pages.home.contentBoxesParagraphs);      
    };

    async assertNumberOfBlogs(qty: number) {
        await expect(this.blogTitles).toHaveCount(qty);
        await expect(this.blogTexts).toHaveCount(qty);
        await expect(this.readMoreButtons).toHaveCount(qty);   
    };

    async assertLearnMoreButton() {
        await expect(this.learnMoreButton).toBeVisible();
        await expect(this.learnMoreButton).toHaveAttribute('href', results.links.whatWeDo);  
    };

    async assertApplyNowButton() {
        await expect(this.applyNowButton).toBeVisible();
        await expect(this.applyNowButton).toHaveAttribute('href', results.links.careers);
    };

    async assertViewBlogButton() {
        await expect(this.viewBlogButton).toBeVisible();
        await expect(this.viewBlogButton).toHaveAttribute('href', results.links.blog);
      };

};