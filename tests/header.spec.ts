// @ts-check
import { chromium, test } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { Utils } from '../utils/utils';
import { HeaderPage } from '../pages/headerPage';

test.describe('Header tests - Mobile', () => {
  test('verify Logo and menu links', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: {
        width: 1080,
        height: 720
      }
    });
    const utils = new Utils(page);
    await utils.visit('/');

    const header = new HeaderPage(page);
    // Expect logo to have the correct link.
    await header.assertAppLogo();
    // Expect button Menu to be displayed.
    await header.isMenuButtonVisible(true);
    await header.clickMenuButton();
    // Expect menu to have correct labels.
    await header.assertMenuLabels();
    // Expand and verify opions for Resources.
    await header.assertResourcesOptionsLabels(true);
    // Expand and verify opions for About.
    await header.assertAboutOptionsLabels(true);
    // Expand and verify opions for What We Do.
    await header.assertServicesOptionsLabels(true);
  });
});

test.describe('Header Page tests - Web', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const utils = new Utils(page);
    await utils.visit('/');
  });

  test.describe('Header Menu tests', () => {
    test('verify Logo and menu links', async ({ page }) => {
      const headerPage = new HeaderPage(page);
      // Expect logo to have the correct link.
      await headerPage.assertAppLogo();
      // Expect menu to have correct labels.
      await headerPage.assertMenuLabels();
      // Button Menu should not be displayed when browser width > 1080
      await headerPage.isMenuButtonVisible(false);
    });

    test('verify sub menu options', async ({ page }) => {
      const header = new HeaderPage(page);
      // Hover and verify options in What We Do
      await header.assertServicesOptionsLabels();
      // Hover and verify options in About
      await header.assertAboutOptionsLabels();
      // Hover and verify options in Resources
      await header.assertResourcesOptionsLabels();
    });

    test('verify navigation to main pages', async ({ page }) => {
      const header = new HeaderPage(page);
      await header.navigateToPage('What We Do', 'services');

      await header.navigateToPage('Work', 'work');

      await header.navigateToPage('About', 'about');

      await header.navigateToPage('^Careers', 'careers');

      await header.navigateToPage('Resources', 'blog');

      await header.navigateToPage('Contact', 'contact');
    });

    test('verify navigation to What We Do pages', async ({ page }) => {
      const header = new HeaderPage(page);
      // Hover and navigate to options in What We Do
      await header.navigateToSubPage('services', 'Product Development', 'digital-product-development');
      await header.navigateToSubPage('services', 'Application Modernisation', 'application-modernisation');
      await header.navigateToSubPage('services', 'DevOps & Platform Engineering', 'devops-platform-engineering');
      await header.navigateToSubPage('services', 'Data Engineering & Analytics', 'enterprise-data-engineering');
    });

    test('verify navigation to About pages', async ({ page }) => {
      const header = new HeaderPage(page);
      // Hover and navigate to options in About
      await header.navigateToSubPage('about', 'About NearForm', 'about');
      await header.navigateToSubPage('about', 'Why NearForm', 'why-nearform');
      await header.navigateToSubPage('about', 'Open Source', 'open-source-community');
    });

    test('verify navigation to Resources pages', async ({ page }) => {
      const header = new HeaderPage(page);
      // Hover and navigate to options in About
      await header.navigateToSubPage('resources', 'Blog', 'blog');
      await header.navigateToSubPage('resources', 'Events', 'events');
    });


  });

});
