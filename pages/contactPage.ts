import { expect, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";


export class ContactPage {
    // Types definition
    readonly page: Page;
    readonly bannerContext: Locator;
    readonly bannerTexts: Locator;
    readonly consentDisclaimer: Locator;
    readonly formTexts: Locator;
    readonly formContext: Locator;
    readonly formLabels: Locator;
    readonly formTitle: Locator;
    readonly requiredMessages: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.bannerContext = page.locator('#content >> .fusion-fullwidth').nth(0);
        this.consentDisclaimer = page.frameLocator('#hs-form-iframe-0').locator('.legal-consent-container');
        this.formContext = page.locator('#content >> .fusion-fullwidth').nth(1);
        this.formLabels = page.frameLocator('#hs-form-iframe-0').locator('label');
        this.formTitle = page.locator('h1');
        this.requiredMessages = page.frameLocator('#hs-form-iframe-0').locator('.hs-error-msgs');
        this.submitButton = page.frameLocator('#hs-form-iframe-0').locator('text=Submit');
    
        this.bannerTexts = this.bannerContext.locator('p');
        this.formTexts = this.formContext.locator('p');
    
    };

    async isRequiredMessagesVisible(visible: boolean) {
        if (visible) {
            await expect(this.requiredMessages).toHaveText(results.pages.contact.formRequiredMessages);
        } else {
            await expect(this.requiredMessages).toHaveCount(0);
        }
    };

    async clickSubmitButton() {
        await this.submitButton.click();
    };

    async assertBannerTexts() {
        await expect(this.bannerTexts).toHaveText(results.pages.contact.bannerText); 
    };

    async assertFormTitle() {
        await expect(this.formTitle).toHaveText(results.pages.contact.formTitle); 
    };

    async assertFormText() {
        await expect(this.formTexts).toHaveText(results.pages.contact.formTexts); 
    };

    async assertFormLabels() {
        await expect(this.formLabels).toHaveText(results.pages.contact.formLabels); 
    };
    
    async assertConsentDisclaimer() {
        await expect(this.consentDisclaimer).toHaveText(results.pages.contact.consentDisclaimer); 
    };
    
    async assertPrivacyPolicyLink() {
        await expect(this.consentDisclaimer.locator('a')).toHaveAttribute('href', results.links.privacyPolicy);
    };

    async assertSubmitButton() {
        await expect(this.submitButton).toBeEnabled();
    };



};