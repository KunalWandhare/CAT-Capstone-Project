import { test, expect } from '../fixtures/page-fixtures';
import { uniqueEmail, loadJson } from '../utils/test-data-helper';

test.describe('Checkout and Order Placement', () => {
  test('should complete full checkout flow with order confirmation', { timeout: 90_000 }, async ({
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
    userData,
  }) => {
    const regData = userData.registrationUsers[0];
    const email = uniqueEmail(regData.email);
    const paymentData = loadJson<{ validCard: { nameOnCard: string; cardNumber: string; cvc: string; expiryMonth: string; expiryYear: string } }>('payment.json');

    // Register a new account
    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.startSignup(regData.name, email);
    await signupPage.fillRegistrationForm(regData);
    await signupPage.submitRegistration();
    await accountCreatedPage.clickContinue();

    // Add products to cart
    await homePage.goToProducts();
    await productsPage.addProductToCartByIndex(0);
    await productsPage.clickContinueShopping();
    await productsPage.addProductToCartByIndex(1);
    await productsPage.clickViewCart();

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Verify address is populated
    const deliveryAddr = await checkoutPage.getDeliveryAddressText();
    expect(deliveryAddr).toContain(regData.firstName);
    expect(deliveryAddr).toContain(regData.lastName);

    await checkoutPage.addComment('Please deliver between 9am and 5pm.');
    await checkoutPage.placeOrder();

    // Enter payment details
    await paymentPage.fillPaymentDetails(paymentData.validCard);
    await paymentPage.submitPayment();

    // Verify order confirmation
    await expect(paymentPage.orderConfirmationMessage).toBeVisible();

    // Clean up
    await homePage.navDeleteAccount.click();
    await homePage.page.locator('[data-qa="continue-button"]').click();
  });
});
