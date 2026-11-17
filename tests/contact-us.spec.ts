import { test, expect } from '../fixtures/page-fixtures';

test.describe('Contact Us Form', () => {
  test('should submit contact form and show success message', async ({
    contactUsPage,
    productData,
  }) => {
    const contactData = productData.contactMessages[0];

    await contactUsPage.navigate();
    await expect(contactUsPage.heading).toBeVisible();

    await contactUsPage.fillForm(contactData);
    await contactUsPage.submitForm();

    await expect(contactUsPage.successMessage).toBeVisible();
  });

  test('should submit contact form with file upload (data-driven)', async ({
    contactUsPage,
    productData,
  }) => {
    for (const contactData of productData.contactMessages) {
      await contactUsPage.navigate();
      await contactUsPage.fillForm(contactData);

      // Upload a dummy file
      const buffer = Buffer.from('Test file content for upload validation');
      await contactUsPage.uploadFileInput.setInputFiles({
        name: 'test-upload.txt',
        mimeType: 'text/plain',
        buffer,
      });

      await contactUsPage.submitForm();
      await expect(contactUsPage.successMessage).toBeVisible();
    }
  });
});
