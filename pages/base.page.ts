import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navProducts: Locator;
  readonly navCart: Locator;
  readonly navLogin: Locator;
  readonly navLogout: Locator;
  readonly navContactUs: Locator;
  readonly navDeleteAccount: Locator;
  readonly loggedInAs: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHome = page.locator('a[href="/"]').first();
    this.navProducts = page.locator('a[href="/products"]');
    this.navCart = page.locator('a[href="/view_cart"]');
    this.navLogin = page.locator('a[href="/login"]');
    this.navLogout = page.locator('a[href="/logout"]');
    this.navContactUs = page.locator('a[href="/contact_us"]');
    this.navDeleteAccount = page.locator('a[href="/delete_account"]');
    this.loggedInAs = page.locator('a:has-text("Logged in as")');
  }

  async goToHome() {
    await this.navHome.click();
  }

  async goToProducts() {
    await this.navProducts.click();
  }

  async goToCart() {
    await this.navCart.click();
  }

  async goToLogin() {
    await this.navLogin.click();
  }

  async goToContactUs() {
    await this.navContactUs.click();
  }

  async logout() {
    await this.navLogout.click();
  }

  async isLoggedIn(): Promise<boolean> {
    return this.loggedInAs.isVisible();
  }

  async getLoggedInUsername(): Promise<string> {
    const text = await this.loggedInAs.textContent();
    return text?.replace('Logged in as ', '').trim() ?? '';
  }

  async dismissAdsIfPresent() {
    try {
      const adFrame = this.page.frameLocator('iframe[id*="ad"]');
      const closeButton = adFrame.locator('[id*="dismiss"], [class*="close"]');
      if (await closeButton.isVisible({ timeout: 2000 })) {
        await closeButton.click();
      }
    } catch {
      // No ads to dismiss
    }
  }
}
