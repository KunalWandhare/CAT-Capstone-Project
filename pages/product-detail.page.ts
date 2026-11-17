import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productCategory: Locator;
  readonly productAvailability: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly viewCartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.product-information h2');
    this.productPrice = page.locator('.product-information span span');
    this.productCategory = page.locator('.product-information p:has-text("Category:")');
    this.productAvailability = page.locator('.product-information p:has-text("Availability:")');
    this.productCondition = page.locator('.product-information p:has-text("Condition:")');
    this.productBrand = page.locator('.product-information p:has-text("Brand:")');
    this.quantityInput = page.locator('#quantity');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.continueShoppingButton = page.locator('button:has-text("Continue Shopping")');
    this.viewCartLink = page.locator('#cartModal a[href="/view_cart"]');
  }

  async setQuantity(qty: number) {
    await this.quantityInput.waitFor({ state: 'visible' });
    await this.quantityInput.clear();
    await this.quantityInput.fill(qty.toString());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickViewCart() {
    await this.viewCartLink.click();
  }

  async getProductInfo() {
    return {
      name: (await this.productName.textContent())?.trim() ?? '',
      price: (await this.productPrice.textContent())?.trim() ?? '',
    };
  }
}
