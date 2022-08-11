// @ts-check
import { test } from '@playwright/test';

import { Utils } from '../utils/utils';
import { FooterPage } from '../pages/footerPage';

test.describe('Footer tests', () => {
  test.beforeEach(async ({ page }) => {
    const utils = new Utils(page);
    await utils.visit('/');
  });

  test('verify Footer content', async ({page}) => {
    const footer = new FooterPage(page);
    // Verify texts
    await footer.assertTitles();
    await footer.assertParagraphs();
    // Verify social media links
    await footer.assertSocialMediaLinks();
    // Verify What We Do labels and links
    await footer.assertWhatWeDoOptions();
    // Verify About labels and links
    await footer.assertAboutOptions();
    // Verify Resources labels and links
    await footer.assertResourcesOptions();
    // Verify buttons
    await footer.assertContactButton();
    await footer.assertSignUpButton();

  });

});

