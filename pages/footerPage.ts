import { expect, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";

const titleValues = results.pages.footer.titles;
const paragraphValues = results.pages.footer.paragraphs;
const whatWeDoLabels = results.pages.footer.servicesLabels;
const aboutLabels = results.pages.footer.aboutLabels;
const resourceLabels = results.pages.footer.resourceLabels;

export class FooterPage {
    // Types definition
    readonly page: Page;
    readonly companyLinks: Locator;
    readonly contactButtons: Locator;
    readonly footerContext: Locator;    
    readonly paragraphs: Locator;
    readonly resourcesLinks: Locator;
    readonly servicesLinks: Locator;
    readonly signUpButton: Locator;
    readonly socialLinks: Locator;
    readonly titles: Locator;

    constructor(page: Page) {
        this.page = page;
        this.footerContext = page.locator('.fusion-tb-footer.fusion-footer');
        this.titles = this.footerContext.locator('[class ^= "title-heading"]');
        this.paragraphs = this.footerContext.locator('p');
        this.contactButtons = this.footerContext.locator('a:has-text("Contact")');
        this.signUpButton = this.footerContext.locator('a:has-text("Sign Up")');
        this.socialLinks = this.footerContext.locator('.fusion-social-links-1 >> a');
        this.servicesLinks = page.locator('#menu-global-footer-services >> a');
        this.companyLinks = page.locator('#menu-global-footer-company >> a');
        this.resourcesLinks = page.locator('#menu-global-footer-resources >> a');
    };

    async isFooterVisible() {
        await expect(this.footerContext).toBeVisible();
    };

    async assertTitles() {
        await expect(this.titles).toHaveText(titleValues);      
    };

    async assertParagraphs() {
        await expect(this.paragraphs).toHaveText(paragraphValues);      
    };

    async assertSocialMediaLinks() {
        const length = await this.socialLinks.count();
        for (let i=0; i < length; i++) {
            await expect(this.socialLinks.nth(i)).toHaveAttribute('href', results.pages.footer.socialMediaLinks[i]);
        };
    };

    async assertWhatWeDoOptions() {
        await expect(this.servicesLinks).toHaveText(whatWeDoLabels); 
        const length = await this.servicesLinks.count();
        for (let i=0; i < length; i++) {
            await expect(this.servicesLinks.nth(i)).toHaveAttribute('href', results.pages.footer.servicesLinks[i]);
        };
    };

    async assertAboutOptions() {
        await expect(this.companyLinks).toHaveText(aboutLabels);
        const length = await this.companyLinks.count();
        for (let i=0; i < length; i++) {
            await expect(this.companyLinks.nth(i)).toHaveAttribute('href', results.pages.footer.aboutLinks[i]);
        };
    };

    async assertResourcesOptions() {
        await expect(this.resourcesLinks).toHaveText(resourceLabels);
        await expect(this.resourcesLinks.nth(0)).toHaveAttribute('href', results.pages.footer.resourceLinks[0]);
        await expect(this.resourcesLinks.nth(1)).toHaveAttribute('href', results.pages.footer.resourceLinks[1]);    
    };

    async assertContactButton() {
        await expect(this.contactButtons.nth(0)).toBeVisible();
        await expect(this.contactButtons.nth(0)).toHaveAttribute('href', results.links.contact);    
    };

    async assertSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toHaveAttribute('href', results.links.signUp);
    };

};