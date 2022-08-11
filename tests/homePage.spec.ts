// @ts-check
import { test } from '@playwright/test';
import { Utils } from '../utils/utils';
import { FooterPage } from '../pages/footerPage';
import { HomePage } from '../pages/homePage';

test.describe('Home Page tests - Web', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const utils = new Utils(page);
    await utils.visit('/');
  });

  test.describe.skip('Accessibility test', () => {
    test('verify home page passes A11y', async ({ page }) => {
      const utils = new Utils(page);
      utils.pageAccessibilityCheck(page);
    });
  });

  test.describe('Page Content tests', () => {
    test('verify Main content', async ({ page }) => {
      const home = new HomePage(page);
      // Verify texts
      await home.assertTitles();
      await home.assertParagraphs();
      await home.assertContentBoxParagraphs();
      // Verify blog content number
      await home.assertNumberOfBlogs(3);
      // Verify buttons
      await home.assertLearnMoreButton();
      await home.assertApplyNowButton();
      await home.assertViewBlogButton();
    });

    test('verify Footer content is displayed', async ({ page }) => {
      const footerPage = new FooterPage(page);
      // Expect footer context to be displayed.
      await footerPage.isFooterVisible();
    });

  });
});
