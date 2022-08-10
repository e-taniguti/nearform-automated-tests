import { expect, Locator, Page } from "@playwright/test";

const titleValues = [
    'Don’t miss a beat',
    'Social',
    'What We Do',
    'About',
    'Resources'
];
const paragraphValues = [
    'Let’s Chat',
    'Get all the latest NearForm news, from technology to design.',
    '© Copyright 2022 NearForm Ltd. All Rights Reserved.',
    'NearForm Ltd. Tankfield, Convent Hill, Tramore, Co. Waterford, X91 PV08, Ireland. Privacy Policy. Cookies Notice.',
];
const whatWeDoOptions = [
    'Product Development',
    'Application Modernisation',
    'DevOps & Platform Engineering',
    'Data Engineering & Analytics'
];
const aboutOptions = [
    'Accessibility',
    'Careers',
    'Contact',
    'Our Work',
    'Open Source',
    'Why NearForm',
];
const resourceOptions = [
    'Blog',
    'Events',
];

export class FooterPage {
    // Types definition
    readonly page: Page;
    readonly titles: Locator;
    readonly paragraphs: Locator;
    readonly contactButtons: Locator;
    readonly signUpButton: Locator;
    readonly socialLinks: Locator;
    readonly servicesLinks: Locator;
    readonly companyLinks: Locator;
    readonly resourcesLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titles = page.locator('.fusion-tb-footer.fusion-footer >> [class ^= "title-heading"]');
        this.paragraphs = page.locator('.fusion-tb-footer.fusion-footer >> p');
        this.contactButtons = page.locator('.fusion-tb-footer.fusion-footer >> a:has-text("Contact")');
        this.signUpButton = page.locator('.fusion-tb-footer.fusion-footer >> a:has-text("Sign Up")');
        this.socialLinks = page.locator('.fusion-tb-footer.fusion-footer >> .fusion-social-links-1 >> a');
        this.servicesLinks = page.locator('#menu-global-footer-services >> a');
        this.companyLinks = page.locator('#menu-global-footer-company >> a');
        this.resourcesLinks = page.locator('#menu-global-footer-resources >> a');
    };

    async assertTitles() {
        await expect(this.titles).toHaveText(titleValues);      
    };

    async assertParagraphs() {
        await expect(this.paragraphs).toHaveText(paragraphValues);      
    };

    async assertSocialMediaLinks() {
        await expect(this.socialLinks.nth(0)).toHaveAttribute('href', 'https://www.linkedin.com/company/nearform/?originalSubdomain=ie');
        await expect(this.socialLinks.nth(1)).toHaveAttribute('href', 'https://twitter.com/nearform');
        await expect(this.socialLinks.nth(2)).toHaveAttribute('href', 'https://www.facebook.com/NearFormLtd');
        await expect(this.socialLinks.nth(3)).toHaveAttribute('href', 'https://www.youtube.com/channel/UCp2Tsbjd3P8itnBHUNHi82A');
        await expect(this.socialLinks.nth(4)).toHaveAttribute('href', 'https://www.instagram.com/nearform_hq');
    };

    async assertWhatWeDoOptions() {
        await expect(this.servicesLinks).toHaveText(whatWeDoOptions);      
        await expect(this.servicesLinks.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/services/digital-product-development/');
        await expect(this.servicesLinks.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/services/application-modernisation/');
        await expect(this.servicesLinks.nth(2)).toHaveAttribute('href', 'https://www.nearform.com/services/devops-platform-engineering/');
        await expect(this.servicesLinks.nth(3)).toHaveAttribute('href', 'https://www.nearform.com/services/enterprise-data-engineering/');    
    };

    async assertAboutOptions() {
        await expect(this.companyLinks).toHaveText(aboutOptions);
        await expect(this.companyLinks.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/accessibility-statement/');
        await expect(this.companyLinks.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/careers/');
        await expect(this.companyLinks.nth(2)).toHaveAttribute('href', 'https://www.nearform.com/contact/');
        await expect(this.companyLinks.nth(3)).toHaveAttribute('href', 'https://www.nearform.com/work/');
        await expect(this.companyLinks.nth(4)).toHaveAttribute('href', 'https://www.nearform.com/open-source-community/');
        await expect(this.companyLinks.nth(5)).toHaveAttribute('href', 'https://www.nearform.com/why-nearform/');    
    };

    async assertResourcesOptions() {
        await expect(this.resourcesLinks).toHaveText(resourceOptions);
        await expect(this.resourcesLinks.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/blog/');
        await expect(this.resourcesLinks.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/events/');    
    };

    async assertContactButton() {
        await expect(this.contactButtons.nth(0)).toBeVisible();
        await expect(this.contactButtons.nth(0)).toHaveAttribute('href', '/contact/');    
    };

    async assertSignUpButton() {
        await expect(this.signUpButton).toBeVisible();
        await expect(this.signUpButton).toHaveAttribute('href', '/newsletter/');
    };

};