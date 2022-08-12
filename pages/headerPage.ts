import { expect, Locator, Page } from "@playwright/test";
import * as results from "../data/results/appResults.json";

export class HeaderPage {
    // Types definition
    readonly page: Page;
    readonly aboutExpandButton: Locator;
    readonly aboutOptionsLabels: Locator;
    readonly logo: Locator;
    readonly menuButton: Locator;
    readonly menuItems: Locator;
    readonly menuLinks: Locator;
    readonly resourceExpandButton: Locator;
    readonly resourceOptionsLabels: Locator;
    readonly servicesExpandButton: Locator;
    readonly servicesOptionsLabels: Locator;
    readonly subMenus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo > a');
        this.menuButton = page.locator('button:has-text("Menu")');
        this.menuItems = page.locator('#menu-main-menu > li');
        this.subMenus = page.locator('#menu-main-menu >> ul');

        this.aboutExpandButton = this.menuItems.locator('button[aria-label="Open submenu of About"]');
        this.aboutOptionsLabels = this.subMenus.nth(1).locator('a');
        this.menuLinks = this.menuItems.locator('> a');
        this.resourceExpandButton = this.menuItems.locator('button[aria-label="Open submenu of Resources"]');
        this.resourceOptionsLabels = this.subMenus.nth(2).locator('a');
        this.servicesExpandButton = this.menuItems.locator('button[aria-label="Open submenu of What We Do"]');
        this.servicesOptionsLabels = this.subMenus.nth(0).locator('a');
    };

    async isMenuButtonVisible(visible: boolean) {
        if (visible) {
            await expect(this.menuButton).toHaveText('Menu');
            await expect(this.menuButton).toBeVisible();
        } else {
            await expect(this.menuButton).not.toBeVisible();
        };
    };

    async navigateToPage(page: string, url: string) {
        await this.menuLinks.locator(`:text-matches("${page}")`).click();
        await this.page.waitForURL(`**/${url}/`, {waitUntil: 'networkidle'});
    };

    async navigateToSubPage(page: 'about' | 'resources' | 'services', option: string, url: string) {
        switch (page) {
            case 'services':
                await this.menuItems.nth(0).hover();
                await this.servicesOptionsLabels.locator(`:text-matches("${option}")`).click();
                break;
            case 'about':
                await this.menuItems.nth(2).hover();
                await this.aboutOptionsLabels.locator(`:text-matches("${option}")`).click();
                break;
            case 'resources':
                await this.menuItems.nth(4).hover();
                await this.resourceOptionsLabels.locator(`:text-matches("${option}")`).click();
                break;
            defaut:
                break;
        };
        await this.page.waitForURL(`**/${url}/`, {waitUntil: 'networkidle'});
    };

    async clickMenuButton() {
        await this.menuButton.click();
    };
    
    async clickAboutExpandButton() {
        await this.aboutExpandButton.click();
    };

    async clickResourceExpandButton() {
        await this.resourceExpandButton.click();
    };

    async clickServicesExpandButton() {
        await this.servicesExpandButton.click();
    };

    async assertAppLogo() {
        await expect(this.logo).toBeVisible();
        await expect(this.logo).toHaveAttribute('href', results.links.nearform);
    };

    async assertMenuLabels() {
        await expect(this.menuLinks).toHaveText(results.pages.header.menuLabels);
    };

    async assertResourcesOptionsLabels(isMobileView?: boolean) {
        if (isMobileView) {
            await this.clickResourceExpandButton();
        } else {
            await this.menuItems.nth(4).hover();
        }
        await expect(this.resourceOptionsLabels).toHaveText(results.pages.header.resourcesOptionsLabels);
    };

    async assertAboutOptionsLabels(isMobileView?: boolean) {
        if (isMobileView) {
            await this.clickAboutExpandButton();
        } else {
            await this.menuItems.nth(2).hover();
        }
        await expect(this.aboutOptionsLabels).toHaveText(results.pages.header.aboutOptionsLabels);
    };

    async assertServicesOptionsLabels(isMobileView?: boolean) {
        if (isMobileView) {
            await this.clickServicesExpandButton();
        } else {
            await this.menuItems.nth(0).hover();
        }
        await expect(this.servicesOptionsLabels).toHaveText(results.pages.header.servicesOptionsLabels);
    };

};