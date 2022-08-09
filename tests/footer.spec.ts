// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Footer tests', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('/');
  });

  test('verify Footer content', async ({page}) => {
    // create a locator
    const titles = page.locator('.fusion-footer >> [class ^= "title-heading"]');
    const paragraphs = page.locator('.fusion-footer >> p');
    const contactButtons = page.locator('.fusion-footer >> a:has-text("Contact")');
    const signUpButton = page.locator('.fusion-footer >> a:has-text("Sign Up")');
    await expect(titles).toHaveText([
      'Don’t miss a beat',
      'Social',
      'What We Do',
      'About',
      'Resources'
    ]);

    await expect(paragraphs).toHaveText([
      'Let’s Chat',
      'Get all the latest NearForm news, from technology to design.',
      '© Copyright 2022 NearForm Ltd. All Rights Reserved.',
      'NearForm Ltd. Tankfield, Convent Hill, Tramore, Co. Waterford, X91 PV08, Ireland. Privacy Policy. Cookies Notice.',
    ]);

    await expect(contactButtons.nth(0)).toBeVisible();
    await expect(contactButtons.nth(0)).toHaveAttribute('href', '/contact/');

    await expect(signUpButton).toBeVisible();
    await expect(signUpButton).toHaveAttribute('href', '/newsletter/');

  });

});

