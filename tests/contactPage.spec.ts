// @ts-check
import { test } from '@playwright/test';
import { Utils } from '../utils/utils';
import { ContactPage } from '../pages/contactPage';
import { FooterPage } from '../pages/footerPage';

test.describe('Contact Page tests', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const utils = new Utils(page);
    await utils.visit('/contact/');
  });

  test.describe.skip('Accessibility test', () => {
    test('verify home page passes A11y', async ({ page }) => {
      const utils = new Utils(page);
      utils.pageAccessibilityCheck(page);
    });
  });

  test('verify Banner information', async ({ page }) => {   
    const contact = new ContactPage(page); 
    // Expect banner to have correct texts.
    await contact.assertBannerTexts();
  });

  test('verify Contact Us form', async ({ page }) => {
    const contact = new ContactPage(page); 
    // Expect form to have correct text.
    await contact.assertFormTitle();
    await contact.assertFormText();
    await contact.assertFormLabels();

    await contact.assertConsentDisclaimer();
    await contact.assertPrivacyPolicyLink();
    await contact.assertSubmitButton();
  });

  test('verify form required fields', async ({ page }) => {
    const contact = new ContactPage(page); 
 
    await contact.isRequiredMessagesVisible(false);
    await contact.clickSubmitButton();
    await contact.isRequiredMessagesVisible(true);
  });

  test('verify Footer content is displayed', async ({page}) => {
    const footer = new FooterPage(page); 
    footer.isFooterVisible();
  });

});

