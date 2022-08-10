// @ts-check
import { chromium, test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';
import { Utils } from '../utils/utils';

test.describe('Home Page tests - Mobile', () => {
  test('verify Logo and menu links', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: {
        width: 1080,
        height: 720
      }
    });
    const utils = new Utils(page);
    await utils.navigateTo('/');

    // create a locator
    const logo = page.locator('#logo > a');
    const menuButton = page.locator('button:has-text("Menu")');
    const menuItems = page.locator('#menu-main-menu > li');
    const menuLinks = menuItems.locator('> a');
    const subMenus = page.locator('#menu-main-menu >> ul');
    const servicesExpandButton = menuItems.locator('button[aria-label="Open submenu of What We Do"]');
    const serviceOptions = subMenus.nth(0).locator('a');
    const aboutExpandButton = menuItems.locator('button[aria-label="Open submenu of About"]');
    const aboutOptions = subMenus.nth(1).locator('a');
    const resourceExpandButton = menuItems.locator('button[aria-label="Open submenu of Resources"]');
    const resourceOptions = subMenus.nth(2).locator('a');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Enterprise Software Development/);

    // Expect logo to have the correct link.
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('href', 'https://www.nearform.com/');

    // Expect button Menu to be displayed.
    await expect(menuButton).toHaveText('Menu');
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    // Expect menu to have correct labels.
    await expect(menuLinks).toHaveText(['What We Do', 'Work', 'About', 'CareersHIRING!', 'Resources', 'Contact']);

    await resourceExpandButton.click();
    await expect(resourceOptions).toHaveText(['Blog', 'Events']);

    await aboutExpandButton.click();
    await expect(aboutOptions).toHaveText(['About NearForm', 'Why NearForm', 'Open Source']);

    await servicesExpandButton.click();
    await expect(serviceOptions).toHaveText(['Product Development', 'Application Modernisation', 'DevOps & Platform Engineering', 'Data Engineering & Analytics']);
  });
});

test.describe('Home Page tests - Web', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    const utils = new Utils(page);
    await utils.navigateTo('/');
  });

  test.describe.skip('Accessibility test', () => {
    test('verify home page passes A11y', async ({ page }) => {
      await injectAxe(page);
      await checkA11y(page, null, {
        detailedReport: true,
        detailedReportOptions: {
          html: true
        }
      });
    });
  });

  test.describe('Header Menu tests', () => {
    test('verify Logo and menu links', async ({ page }) => {
      // create a locator
      const logo = page.locator('#logo > a');
      const menuLinks = page.locator('#menu-main-menu > li > a');
      const menuButton = page.locator('button:has-text("Menu")');

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Enterprise Software Development/);

      // Expect logo to have the correct link.
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', 'https://www.nearform.com/');

      // Expect menu to have correct labels.
      await expect(menuLinks).toHaveText(['What We Do', 'Work', 'About', 'CareersHIRING!', 'Resources', 'Contact']);

      await expect(menuButton).not.toBeVisible();
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

    test('verify What We Do page opens', async ({ page }) => {
      const servicesButton = page.locator('#menu-main-menu > li > a').locator(':has-text("What We Do")');
      await servicesButton.click();
      await expect(page).toHaveURL('/services/');
    });

    test('verify Work page opens', async ({ page }) => {
      const workButton = page.locator('#menu-main-menu > li > a').locator(':has-text("Work")');
      await workButton.click();
      await expect(page).toHaveURL('/work/');
    });

    test('verify About page opens', async ({ page }) => {
      const aboutButton = page.locator('#menu-main-menu > li > a').locator(':has-text("About")');
      await aboutButton.click();
      await expect(page).toHaveURL('/about/');
    });


    test('verify Careers page opens', async ({ page }) => {
      const careersButton = page.locator('#menu-main-menu > li > a').locator(':text-matches("^Careers")');
      await careersButton.click();
      await expect(page).toHaveURL('/careers/');
    });

    test('verify Blog page opens', async ({ page }) => {
      const resourcesButton = page.locator('#menu-main-menu > li > a').locator(':has-text("Resources")');
      await resourcesButton.click();
      await expect(page).toHaveURL('/blog/');
    });

    test('verify Contact page opens', async ({ page }) => {
      const contactButton = page.locator('#menu-main-menu > li > a').locator(':has-text("Contact")');
      await contactButton.click();
      await expect(page).toHaveURL('/contact/');
    });

  });

  test.describe('Page Content tests', () => {
    test('verify Main content', async ({ page }) => {
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
        'The Human-Centric CIO',
        'Secure DevOps: The What, the Why and the How',
        'Deploying with Google Compute Engine on Google Cloud Platform',
      ]);

      await expect(blogTexts).toContainText([
        'Digital Transformation, Innovation, Interviews',
        'Capability Building, DevOps, Security',
        'Cloud Native, DevOps, DevRel',
      ]);

      await expect(learnMoreButton).toBeVisible();
      await expect(learnMoreButton).toHaveAttribute('href', '/what-we-do/');

      await expect(applyNowButton).toBeVisible();
      await expect(applyNowButton).toHaveAttribute('href', '/careers/');

      await expect(readMoreButtons.nth(0)).toBeVisible();
      await expect(readMoreButtons.nth(0)).toHaveAttribute('href', 'https://www.nearform.com/blog/human-centric-cio/');
      await expect(readMoreButtons.nth(1)).toBeVisible();
      await expect(readMoreButtons.nth(1)).toHaveAttribute('href', 'https://www.nearform.com/blog/secure-devops-what-why-how/');
      await expect(readMoreButtons.nth(2)).toBeVisible();
      await expect(readMoreButtons.nth(2)).toHaveAttribute('href', 'https://www.nearform.com/blog/deploying-with-google-compute-engine-on-gcp/');

      await expect(viewBlogButton).toBeVisible();
      await expect(viewBlogButton).toHaveAttribute('href', '/blog/');

    });

    test('verify Footer content is displayed', async ({ page }) => {
      // create a locator
      const footerContext = page.locator('.fusion-tb-footer.fusion-footer');

      await expect(footerContext).toBeVisible();
    });

  });
});

