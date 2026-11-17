import { test, expect } from '../fixtures/page-fixtures';

test.describe('Product Search', () => {
  test('should display all products on the products page', async ({
    productsPage,
  }) => {
    await productsPage.navigate();
    await expect(productsPage.allProductsHeading).toBeVisible();

    const count = await productsPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should return relevant results for each search term (data-driven)', async ({
    productsPage,
    productData,
  }) => {
    for (const { term, expectedMinResults } of productData.searchTerms) {
      await productsPage.navigate();
      await productsPage.searchProduct(term);

      await expect(productsPage.searchedProductsHeading).toBeVisible();

      const count = await productsPage.getProductCount();
      expect(count).toBeGreaterThanOrEqual(expectedMinResults);

      const names = await productsPage.getProductNames();
      const termLower = term.toLowerCase();
      const hasRelevantResult = names.some((n) =>
        n.toLowerCase().includes(termLower)
      );
      expect(hasRelevantResult).toBeTruthy();
    }
  });

  test('should navigate to product detail page', async ({
    productsPage,
    productDetailPage,
  }) => {
    await productsPage.navigate();
    await productsPage.viewProductByIndex(0);

    await expect(productDetailPage.productName).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productAvailability).toBeVisible();
    await expect(productDetailPage.productCondition).toBeVisible();
    await expect(productDetailPage.productBrand).toBeVisible();
  });
});
