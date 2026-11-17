import { test, expect } from '../fixtures/page-fixtures';

test.describe('Visual Regression Testing', () => {
  test('should match homepage visual snapshot', async ({ homePage, page }) => {
    await homePage.navigate();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('should match login page visual snapshot', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });

  test('should match products page visual snapshot', async ({
    productsPage,
    page,
  }) => {
    await productsPage.navigate();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('products-page.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.05,
    });
  });
});
