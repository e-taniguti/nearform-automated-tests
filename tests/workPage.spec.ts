// @ts-check
import { test } from '@playwright/test';

import { Utils } from '../utils/utils';
import { WorkPage } from '../pages/workPage';
import { FooterPage } from '../pages/footerPage';

test.describe('Work Page tests', () => {
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    const work = new WorkPage(page); 
    await utils.visit('/work/');
    // Expect the page has the correct title.
    await work.assertPageTitle();
  });

  test.describe.skip('Accessibility test', () => {
    test('verify home page passes A11y', async ({ page }) => {
      const utils = new Utils(page);
      utils.pageAccessibilityCheck(page);
    });
  });

  test.describe('Page Content tests', () => {
    test('verify breadcrumb information', async ({ page }) => {   
      const work = new WorkPage(page); 
      // Expect breadcrumb to have correct path.
      await work.assertBreadcrumb();
      await work.assertBreadcrumbLinks();
    });
  
    test('verify Main content', async ({ page }) => {
      const work = new WorkPage(page); 
      // Verify texts
      await work.assertTitles();
      await work.assertParagraphs();
      // Verify buttons
      await work.assertReadStoryButtons();
      // Verify card links
      await work.assertCardLinks();
    });

    test('verify Footer content is displayed', async ({ page }) => {
      const footerPage = new FooterPage(page);
      // Expect footer context to be displayed.
      await footerPage.isFooterVisible();
    });

  });

});

