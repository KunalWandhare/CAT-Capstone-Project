import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly searchedProductsHeading: Locator;
  readonly allProductsHeading: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.features_items .col-sm-4');
    this.searchedProductsHeading = page.locator('h2:has-text("Searched Products")');
    this.allProductsHeading = page.locator('h2:has-text("All Products")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  }

  async navigate() {
    await this.page.goto('/products');
  }

  async searchProduct(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getProductCount(): Promise<number> {
    return this.productCards.count();
  }

  async getProductNames(): Promise<string[]> {
    const names: string[] = [];
    const count = await this.productCards.count();
    for (let i = 0; i < count; i++) {
      const name = await this.productCards.nth(i).locator('.productinfo p').textContent();
      if (name) names.push(name.trim());
    }
    return names;
  }

  async addProductToCartByIndex(index: number) {
    const card = this.productCards.nth(index);
    await card.scrollIntoViewIfNeeded();
    const overlay = card.locator('.product-overlay');
    await card.hover();
    await overlay.locator('a.add-to-cart').click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async viewProductByIndex(index: number) {
    const viewLink = this.productCards.nth(index).locator('a:has-text("View Product")');
    await viewLink.click();
  }
}
