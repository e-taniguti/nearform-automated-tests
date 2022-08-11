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
        await expect(this.socialLinks.nth(0)).toHaveAttribute('href', results.links.linkedIn);
        await expect(this.socialLinks.nth(1)).toHaveAttribute('href', results.links.tweeter);
        await expect(this.socialLinks.nth(2)).toHaveAttribute('href', results.links.facebook);
        await expect(this.socialLinks.nth(3)).toHaveAttribute('href', results.links.youtube);
        await expect(this.socialLinks.nth(4)).toHaveAttribute('href', results.links.instagram);
    };

    async assertWhatWeDoOptions() {
        await expect(this.servicesLinks).toHaveText(whatWeDoLabels);      
        await expect(this.servicesLinks.nth(0)).toHaveAttribute('href', results.links.digitalProductDevelopment);
        await expect(this.servicesLinks.nth(1)).toHaveAttribute('href', results.links.applicationModernisation);
        await expect(this.servicesLinks.nth(2)).toHaveAttribute('href', results.links.devopsPlatformEngineering);
        await expect(this.servicesLinks.nth(3)).toHaveAttribute('href', results.links.enterpriseDataEngineering);    
    };

    async assertAboutOptions() {
        await expect(this.companyLinks).toHaveText(aboutLabels);
        await expect(this.companyLinks.nth(0)).toHaveAttribute('href', results.links.accessibilityStatement);
        await expect(this.companyLinks.nth(1)).toHaveAttribute('href', results.links.carrers);
        await expect(this.companyLinks.nth(2)).toHaveAttribute('href', results.links.contact);
        await expect(this.companyLinks.nth(3)).toHaveAttribute('href', results.links.work);
        await expect(this.companyLinks.nth(4)).toHaveAttribute('href', results.links.openSourceCommunity);
        await expect(this.companyLinks.nth(5)).toHaveAttribute('href', results.links.whyNearForm);    
    };

    async assertResourcesOptions() {
        await expect(this.resourcesLinks).toHaveText(resourceLabels);
        await expect(this.resourcesLinks.nth(0)).toHaveAttribute('href', results.links.blog);
        await expect(this.resourcesLinks.nth(1)).toHaveAttribute('href', results.links.events);    
    };

    async assertContactButton() {
        await expect(this.contactButtons.nth(0)).toBeVisible();
        await expect(this.contactButtons.nth(0)).toHaveAttribute('href', results.links.contactShort);    
    };

    async assertSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toHaveAttribute('href', results.links.signUp);
    };

};