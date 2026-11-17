import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;
  readonly orderComment: Locator;
  readonly placeOrderButton: Locator;
  readonly cartItemRows: Locator;
  readonly totalAmount: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryAddress = page.locator('#address_delivery');
    this.billingAddress = page.locator('#address_invoice');
    this.orderComment = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.locator('a:has-text("Place Order")');
    this.cartItemRows = page.locator('#cart_info_table tbody tr');
    this.totalAmount = page.locator('.cart_total_price');
  }

  async getDeliveryAddressText(): Promise<string> {
    return (await this.deliveryAddress.textContent())?.trim() ?? '';
  }

  async getBillingAddressText(): Promise<string> {
    return (await this.billingAddress.textContent())?.trim() ?? '';
  }

  async addComment(comment: string) {
    await this.orderComment.fill(comment);
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }
}
