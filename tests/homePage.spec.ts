// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home Page tests', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://www.nearform.com/');
  });
  
  test('verify Logo and menu links', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Enterprise Software Development/);
  
    // create a locator
    const logo = page.locator('#logo > a');
    const menuLinks = page.locator('#menu-main-menu > li > a');
  
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', 'https://www.nearform.com/');
  
    // Expect an attribute "to be strictly equal" to the value.
    await expect(menuLinks).toHaveText(['What We Do', 'Work', 'About', 'CareersHIRING!', 'Resources', 'Contact']);
  });
  
});

