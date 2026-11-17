import { test, expect } from '../fixtures/page-fixtures';

test.describe('Network Interception and Mocking', () => {
  test('should intercept and fulfill a request with mocked data', async ({
    page,
  }) => {
    let intercepted = false;

    // Intercept any request to the products list API from the browser
    await page.route('**/productsList', (route) => {
      intercepted = true;
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: '<html><body><h1>Mocked Products</h1><p>Product A</p><p>Product B</p></body></html>',
      });
    });

    // Navigate to a URL that triggers the route
    await page.goto('https://automationexercise.com/api/productsList');

    // Verify the route was intercepted and mocked content is served
    expect(intercepted).toBeTruthy();
    await expect(page.locator('h1')).toHaveText('Mocked Products');
    await expect(page.locator('p').first()).toHaveText('Product A');
  });

  test('should capture and verify network requests on product search', async ({
    productsPage,
    page,
  }) => {
    const requests: string[] = [];

    page.on('request', (req) => {
      if (req.url().includes('automationexercise.com')) {
        requests.push(req.url());
      }
    });

    await productsPage.navigate();

    expect(requests.length).toBeGreaterThan(0);
    const hasProductsPageRequest = requests.some((url) =>
      url.includes('/products')
    );
    expect(hasProductsPageRequest).toBeTruthy();
  });

  test('should block specific resources and verify page loads without them', async ({
    page,
  }) => {
    const blockedUrls: string[] = [];

    // Block image requests to speed up page load
    await page.route('**/*.{png,jpg,jpeg,gif}', (route) => {
      blockedUrls.push(route.request().url());
      route.abort();
    });

    await page.goto('https://automationexercise.com/');

    // Verify images were blocked
    expect(blockedUrls.length).toBeGreaterThan(0);

    // Page should still be functional despite blocked images
    await expect(page.locator('a[href="/products"]')).toBeVisible();
  });
});
