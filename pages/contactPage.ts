import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";


export class ContactPage {
    // Types definition
    readonly page: Page;
    readonly bannerContext: Locator;
    readonly bannerTexts: Locator;
    readonly consentDisclaimer: Locator;
    readonly emailInput: Locator;
    readonly formTexts: Locator;
    readonly formContext: Locator;
    readonly formLabels: Locator;
    readonly formTitle: Locator;
    readonly iframe: FrameLocator;
    readonly phoneInput: Locator;
    readonly requiredMessages: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.iframe = page.frameLocator('#hs-form-iframe-0');
        this.bannerContext = page.locator('#content >> .fusion-fullwidth').nth(0);
        this.formContext = page.locator('#content >> .fusion-fullwidth').nth(1);
        this.formTitle = page.locator('.fusion-title h1');
    
        this.bannerTexts = this.bannerContext.locator('p');
        this.formTexts = this.formContext.locator('p');

        this.consentDisclaimer = this.iframe.locator('.legal-consent-container');
        this.emailInput = this.iframe.locator('input[name="email"]');
        this.phoneInput = this.iframe.locator('input[type="tel"]');
        this.formLabels = this.iframe.locator('label');
        this.requiredMessages = this.iframe.locator('.hs-error-msgs');
        this.submitButton = this.iframe.locator('text=Submit');

    };

    async isRequiredMessagesVisible(visible: boolean) {
        if (visible) {
            await expect(this.requiredMessages).toHaveText(results.pages.contact.formRequiredMessages);
        } else {
            await expect(this.requiredMessages).toHaveCount(0);
        }
    };

    async isEmailFormatErrorVisible(visible: boolean) {
        if (visible) {
            await expect(this.requiredMessages).toHaveText(results.pages.contact.emailFormatError);
        } else {
            await expect(this.requiredMessages).toHaveCount(0);
        }
    };

    async isPhoneFormatErrorVisible(visible: boolean) {
        if (visible) {
            await expect(this.requiredMessages).toHaveText(results.pages.contact.phoneFormatError);
        } else {
            await expect(this.requiredMessages).toHaveCount(0);
        }
    };

    async clickSubmitButton() {
        await this.submitButton.click();
    };

    async typeEmail(email: string) {
        await this.emailInput.type(email);
    };

    async typePhone(phone: string) {
        await this.phoneInput.type(phone);
    };

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(results.contactTitle);
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