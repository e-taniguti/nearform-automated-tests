// @ts-check
import { test } from '@playwright/test';

import { Utils } from '../utils/utils';
import { FooterPage } from '../pages/footerPage';

test.describe('Footer tests', () => {
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    await utils.navigateTo('/');
  });

  test('verify Footer content', async ({page}) => {
    const footerPage = new FooterPage(page);
    // Verify texts
    await footerPage.assertTitles();
    await footerPage.assertParagraphs();
    // Verify social media links
    await footerPage.assertSocialMediaLinks();
    // Verify What We Do labels and links
    await footerPage.assertWhatWeDoOptions();
    // Verify About labels and links
    await footerPage.assertAboutOptions();
    // Verify Resources labels and links
    await footerPage.assertResourcesOptions();
    // Verify buttons
    await footerPage.assertContactButton();
    await footerPage.assertSignUpButton();

  });

});

