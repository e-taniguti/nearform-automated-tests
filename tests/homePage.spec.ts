// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Home Page tests', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('https://www.nearform.com/');
  });

  test.describe('Header Menu tests', () => {
    test('verify Logo and menu links', async ({ page }) => {
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Enterprise Software Development/);
    
      // create a locator
      const logo = page.locator('#logo > a');
      const menuLinks = page.locator('#menu-main-menu > li > a');
    
      // Expect logo to have the correct link.
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', 'https://www.nearform.com/');
    
      // Expect menu to have correct labels.
      await expect(menuLinks).toHaveText(['What We Do', 'Work', 'About', 'CareersHIRING!', 'Resources', 'Contact']);

      // Expect menu to have correct links.
      await expect(menuLinks.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/services/');
      await expect(menuLinks.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/work/');
      await expect(menuLinks.nth(2)).toHaveAttribute('href', 'https://www.nearform.com/about/');
      await expect(menuLinks.nth(3)).toHaveAttribute('href', 'https://www.nearform.com/careers/');
      await expect(menuLinks.nth(4)).toHaveAttribute('href', 'https://www.nearform.com/blog/');
      await expect(menuLinks.nth(5)).toHaveAttribute('href', 'https://www.nearform.com/contact/');
    });

    test('verify What We Do options', async ({ page }) => {
      // create a locator
      const subMenus = page.locator('#menu-main-menu >> ul');
      const subMenuOptions = subMenus.nth(0).locator('a');

      // Expect menu to have correct labels.
      await expect(subMenuOptions).toHaveText(['Product Development', 'Application Modernisation', 'DevOps & Platform Engineering', 'Data Engineering & Analytics']);
    });

    test('verify About options', async ({ page }) => {
      // create a locator
      const subMenus = page.locator('#menu-main-menu >> ul');
      const subMenuOptions = subMenus.nth(1).locator('a');

      // Expect menu to have correct labels.
      await expect(subMenuOptions).toHaveText(['About NearForm', 'Why NearForm', 'Open Source']);
    });

    test('verify Resources options', async ({ page }) => {
      // create a locator
      const subMenus = page.locator('#menu-main-menu >> ul');
      const subMenuOptions = subMenus.nth(2).locator('a');

      // Expect menu to have correct labels.
      await expect(subMenuOptions).toHaveText(['Blog', 'Events']);
    });
  });

  test.describe('Page Content tests', () => {
    test('verify Main content', async ({page}) => {
      // create a locator
      const titles = page.locator('#main >> [class ^= "title-heading"]');
      const texts = page.locator('#main >> .fusion-text > p');
      const contentBoxTexts = page.locator('#main >> .fusion-content-boxes >> p');
      const blogTitles = page.locator('#main >> .fusion-blog-shortcode >> h2');
      const blogTexts = page.locator('#main >> .fusion-blog-shortcode >> p');
      const learnMoreButton = page.locator('a:has-text("Learn More")');
      const applyNowButton = page.locator('a:has-text("Apply Now")');
      const readMoreButtons = page.locator('a:has-text("Read More")');
      const viewBlogButton = page.locator('a:has-text("View the Blog")');

      await expect(titles).toHaveText([
        'Creating Digital Advantage',
        'What We Do',
        'Our Services',
        'Our Work',
        'Our Culture',
        'Latest Insights',
      ]);

      await expect(texts).toHaveText([
        'We design and build future-ready digital products to accelerate transformation and create digital capability.',
        'Accelerating transformation through:',
        'We believe that great things happen when you get the very best talent working on the toughest problems. Our culture empowers us to produce great work and great outcomes, both professional and personal.',
        'We live this culture every day as a company with over ten years of remote-first operation, sourcing the very best talent from thirty countries and connecting through client projects, open source communities and constant conversation and collaboration.',
        'Every NearFormer is challenged to strive, learn and grow and is supported by a strongly bonded team that believes in the work we do.',
    ]);

      await expect(contentBoxTexts).toHaveText([
        'We design, architect and engineer digital products to improve business outcomes, simplify workflows and drive growth.',
        'We transform complex, monolithic legacy applications into modern digital platforms to accelerate business outcomes.',
        'We embed DevSecOps and engineering practices to create developer-facing platforms that accelerate software delivery.',
        'We make high quality data and insights readily available, empowering teams to solve business-critical challenges.',
      ]);

      await expect(blogTitles).toContainText([
        'Secure DevOps: The What, the Why and the How',
        'Deploying with Google Compute Engine on Google Cloud Platform',
        'Vlog: On the Road Again, Episode 1',
      ]);

      await expect(blogTexts).toContainText([
        'Capability Building, DevOps, Security',
        'Cloud Native, DevOps, DevRel',
        'DevRel, Remote Working, Video',
      ]);

      await expect(learnMoreButton).toBeVisible();
      await expect(learnMoreButton).toHaveAttribute('href', '/what-we-do/');

      await expect(applyNowButton).toBeVisible();
      await expect(applyNowButton).toHaveAttribute('href', '/careers/');

      await expect(readMoreButtons.nth(0)).toBeVisible();
      await expect(readMoreButtons.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/blog/secure-devops-what-why-how/');
      await expect(readMoreButtons.nth(1)).toBeVisible();
      await expect(readMoreButtons.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/blog/deploying-with-google-compute-engine-on-gcp/');
      await expect(readMoreButtons.nth(2)).toBeVisible();
      await expect(readMoreButtons.nth(2)).toHaveAttribute('href', 'https://www.nearform.com/blog/vlog-on-the-road-again-episode-1/');

      await expect(viewBlogButton).toBeVisible();
      await expect(viewBlogButton).toHaveAttribute('href', '/blog/');

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
});

