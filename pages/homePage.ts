import { expect, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";

const titleValues = results.pages.home.titles;
const paragraphValues = results.pages.home.paragraphs;
const contentBoxParagraphValues = results.pages.home.contentBoxesParagraphs;


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
        this.blogTexts = page.locator('#main >> .fusion-blog-shortcode >> p');
        this.blogTitles = page.locator('#main >> .fusion-blog-shortcode >> h2');
        this.contentBoxParagraphs = page.locator('#main >> .fusion-content-boxes >> p');
        this.learnMoreButton = page.locator('a:has-text("Learn More")');
        this.paragraphs = page.locator('#main >> .fusion-text > p');
        this.readMoreButtons = page.locator('a:has-text("Read More")');
        this.titles = page.locator('#main >> [class ^= "title-heading"]');
        this.viewBlogButton = page.locator('a:has-text("View the Blog")');
    };

    async assertTitles() {
        await expect(this.titles).toHaveText(titleValues);      
    };

    async assertParagraphs() {
        await expect(this.paragraphs).toHaveText(paragraphValues);      
    };

    async assertContentBoxParagraphs() {
        await expect(this.contentBoxParagraphs).toHaveText(contentBoxParagraphValues);      
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
        await expect(this.applyNowButton).toHaveAttribute('href', results.links.careersShort);
    };

    async assertViewBlogButton() {
        await expect(this.viewBlogButton).toBeVisible();
        await expect(this.viewBlogButton).toHaveAttribute('href', results.links.blogShort);
      };

};