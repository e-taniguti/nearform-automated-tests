// @ts-check
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Contact Page tests', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/contact/');
  });

  test.describe('Accessibility test', () => {
    test.skip('verify home page passes A11y', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true
        } 
      });
    });
  });

  test('verify Banner information', async ({ page }) => {    
    // create a locator
    const bannerContext = page.locator('#content >> .fusion-fullwidth').nth(0);
    const texts = bannerContext.locator('p');
    // Expect banner to have correct texts.
    await expect(texts).toHaveText([
      'Sales',
      'sales@nearform.com',
      'Recruitment',
      'careers@nearform.com',
      'Enquiries',
      'info@nearform.com',
    ]);
  });

  test('verify Contact Us form', async ({ page }) => {
    // create a locator
    const title = page.locator('h1');
    const formContext = page.locator('#content >> .fusion-fullwidth').nth(1);
    const contactTexts = formContext.locator('p');
    const labels = page.frameLocator('#hs-form-iframe-0').locator('label');
    const consentDisclaimer = page.frameLocator('#hs-form-iframe-0').locator('.legal-consent-container');
    const submitButton = page.frameLocator('#hs-form-iframe-0').locator('text=Submit');

    // Expect form to have correct labels.
    await expect(title).toHaveText('Contact Us');
    await expect(contactTexts).toHaveText([
      'Send us an email and we’ll get back to you within 24 hours.',
      'International',
      '+353 51 330 290',
      'United States',
      '(916) 299-6882',
      'United Kingdom',
      '0870 067 95569',
      'Ireland',
      '051 330 290',
      'Address',
      'NearForm Tankfield, Convent Hill Tramore Co. Waterford X91 PV08 Ireland',
    ]);
    await expect(labels).toHaveText([
      'First Name (required)*',
      'Last Name (required)*',
      'Email (required)*',
      'Job Title (required)*',
      'Country code and phone number',
      'Organisation Name (required)*',
      'Please select your enquiry below: (required)*',
      'How Can We Help? (required)*',
    ]);
    await expect(consentDisclaimer).toHaveText('You may unsubscribe from these communications at anytime. For information on how to unsubscribe, check out our Privacy Policy.');
    await expect(consentDisclaimer.locator('a')).toHaveAttribute('href', 'https://www.nearform.com/privacy-statement/');
    await expect(submitButton).toBeEnabled();
  });

  test.skip('verify form required fields', async ({ page }) => {
    const submitButton = page.frameLocator('#hs-form-iframe-0').locator('text=Submit');
    const errorMessages = page.frameLocator('#hs-form-iframe-0').locator('.hs-error-msg');
    
    await expect(errorMessages).toHaveCount(0);
    await submitButton.click();
    await expect(errorMessages).toHaveCount(7);



  });

  test('verify Footer content is displayed', async ({page}) => {
    // create a locator
    const footerContext = page.locator('.fusion-tb-footer.fusion-footer');

    await expect(footerContext).toBeVisible();
  });

});

