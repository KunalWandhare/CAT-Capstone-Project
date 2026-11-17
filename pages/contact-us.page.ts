import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactUsPage extends BasePage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageTextarea: Locator;
  readonly uploadFileInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;
  readonly homeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator('h2:has-text("Get In Touch")');
    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageTextarea = page.locator('[data-qa="message"]');
    this.uploadFileInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
    this.successMessage = page.locator('#contact-page .alert-success');
    this.homeButton = page.locator('a:has-text("Home")').nth(1);
  }

  async navigate() {
    await this.page.goto('/contact_us');
  }

  async fillForm(data: { name: string; email: string; subject: string; message: string }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageTextarea.fill(data.message);
  }

  async submitForm() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.submitButton.click();
  }
}
