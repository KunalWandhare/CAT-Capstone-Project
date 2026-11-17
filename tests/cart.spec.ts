import { test, expect } from '../fixtures/page-fixtures';

test.describe('Shopping Cart', () => {
  test('should add products to cart and verify cart contents', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.navigate();

    // Add first product
    await productsPage.addProductToCartByIndex(0);
    await productsPage.clickContinueShopping();

    // Add second product
    await productsPage.addProductToCartByIndex(1);
    await productsPage.clickViewCart();

    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    const items = await cartPage.getCartItems();
    expect(items[0].name).toBeTruthy();
    expect(items[1].name).toBeTruthy();
    expect(items[0].quantity).toBe('1');
    expect(items[1].quantity).toBe('1');
  });

  test('should remove a product from the cart', async ({
    productsPage,
    cartPage,
  }) => {
    await productsPage.navigate();

    // Add two products
    await productsPage.addProductToCartByIndex(0);
    await productsPage.clickContinueShopping();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.clickViewCart();

    expect(await cartPage.getCartItemCount()).toBe(2);

    // Remove first item
    await cartPage.removeItemByIndex(0);
    await cartPage.page.waitForTimeout(1000);

    expect(await cartPage.getCartItemCount()).toBe(1);
  });

  test('should add product with specific quantity from detail page', async ({
    productsPage,
    productDetailPage,
    cartPage,
  }) => {
    await productsPage.navigate();
    await productsPage.viewProductByIndex(0);

    await productDetailPage.setQuantity(4);
    await productDetailPage.addToCart();
    await productDetailPage.clickViewCart();

    const items = await cartPage.getCartItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe('4');
  });
});
