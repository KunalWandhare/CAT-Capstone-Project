import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly categorySection: Locator;
  readonly featuredItems: Locator;
  readonly scrollUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.categorySection = page.locator('.left-sidebar');
    this.featuredItems = page.locator('.features_items .col-sm-4');
    this.scrollUpButton = page.locator('#scrollUp');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async getFeaturedProductCount(): Promise<number> {
    return this.featuredItems.count();
  }

  async addProductToCartByIndex(index: number) {
    const product = this.featuredItems.nth(index);
    await product.scrollIntoViewIfNeeded();
    await product.locator('.add-to-cart').first().click();
  }

  async clickContinueShopping() {
    await this.page.locator('button:has-text("Continue Shopping")').click();
  }

  async clickViewCart() {
    await this.page.locator('a:has-text("View Cart")').click();
  }
}
