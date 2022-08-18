import { test } from '@playwright/test';
import { CareersPage } from '../pages/careersPage';

import { Utils } from '../utils/utils';

test.describe('Careers Page tests', () => {
    test.beforeEach(async ({ page }) => {
      const utils = new Utils(page);
      const careers = new CareersPage(page); 
      await utils.visit('/careers/');
      // Expect the page has the correct title.
      await careers.assertPageTitle();
    });
  
    test.describe.skip('Accessibility test', () => {
      test('verify home page passes A11y', async ({ page }) => {
        const utils = new Utils(page);
        utils.pageAccessibilityCheck(page);
      });
    });

    test.describe('Page Content tests', () => {
        test('verify Main content', async ({ page }) => {
            const careers = new CareersPage(page); 

            await careers.assertTitles();
            await careers.assertNFValues();

            await careers.assertNearFormersSay();
            await careers.assertFAQ();

            await careers.assertJobsFilter();
        });
      
        test('verify department filter', async ({ page }) => {
          const careers = new CareersPage(page); 

          await careers.assertCardsByDept('All Departments');

          await careers.selectDept('Delivery');
          await careers.assertCardsByDept('Delivery');
          
          await careers.selectDept('Sales');
          await careers.assertCardsByDept('Sales');
      });

    });
});  