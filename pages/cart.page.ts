import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export interface CartItem {
  name: string;
  price: string;
  quantity: string;
  total: string;
}

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly emptyCartMessage: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly registerLoginLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('#cart_info_table tbody tr');
    this.emptyCartMessage = page.locator('#empty_cart');
    this.proceedToCheckoutButton = page.locator('a:has-text("Proceed To Checkout")');
    this.registerLoginLink = page.locator('#checkoutModal a[href="/login"]');
  }

  async navigate() {
    await this.page.goto('/view_cart');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItems(): Promise<CartItem[]> {
    const items: CartItem[] = [];
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      const row = this.cartItems.nth(i);
      items.push({
        name: (await row.locator('.cart_description h4 a').textContent())?.trim() ?? '',
        price: (await row.locator('.cart_price p').textContent())?.trim() ?? '',
        quantity: (await row.locator('.cart_quantity button').textContent())?.trim() ?? '',
        total: (await row.locator('.cart_total p').textContent())?.trim() ?? '',
      });
    }
    return items;
  }

  async removeItemByIndex(index: number) {
    await this.cartItems.nth(index).locator('.cart_quantity_delete').click();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    return this.emptyCartMessage.isVisible();
  }
}
