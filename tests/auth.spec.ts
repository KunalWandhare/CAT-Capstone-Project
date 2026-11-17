import { test, expect } from '../fixtures/page-fixtures';
import { uniqueEmail } from '../utils/test-data-helper';

test.describe('User Authentication', () => {
  test('should register a new user and verify account creation', { timeout: 60_000 }, async ({
    homePage,
    loginPage,
    signupPage,
    accountCreatedPage,
    userData,
  }) => {
    const regData = userData.registrationUsers[0];
    const email = uniqueEmail(regData.email);

    await homePage.navigate();
    await homePage.goToLogin();

    await expect(loginPage.signupHeading).toBeVisible();
    await loginPage.startSignup(regData.name, email);

    await signupPage.fillRegistrationForm(regData);
    await signupPage.submitRegistration();

    await expect(accountCreatedPage.heading).toBeVisible();
    await accountCreatedPage.clickContinue();

    await expect(homePage.loggedInAs).toBeVisible();
    const username = await homePage.getLoggedInUsername();
    expect(username).toBe(regData.name);

    // Clean up: delete account
    await homePage.navDeleteAccount.click();
    await expect(homePage.page.locator('[data-qa="account-deleted"]')).toBeVisible();
    await homePage.page.locator('[data-qa="continue-button"]').click();
  });

  test('should login with valid credentials and logout', { timeout: 90_000 }, async ({
    homePage,
    loginPage,
    userData,
    signupPage,
    accountCreatedPage,
  }) => {
    // First register a user to ensure credentials exist
    const regData = userData.registrationUsers[1];
    const email = uniqueEmail(regData.email);
    const password = regData.password;

    await homePage.navigate();
    await homePage.goToLogin();
    await loginPage.startSignup(regData.name, email);
    await signupPage.fillRegistrationForm(regData);
    await signupPage.submitRegistration();
    await accountCreatedPage.clickContinue();

    // Logout
    await homePage.logout();
    await expect(loginPage.loginHeading).toBeVisible();

    // Login with registered credentials
    await loginPage.login(email, password);
    await expect(homePage.loggedInAs).toBeVisible();

    // Logout again
    await homePage.logout();
    await expect(loginPage.loginHeading).toBeVisible();

    // Clean up: login and delete
    await loginPage.login(email, password);
    await homePage.navDeleteAccount.click();
    await homePage.page.locator('[data-qa="continue-button"]').click();
  });

  test('should show error for invalid login credentials', async ({
    homePage,
    loginPage,
  }) => {
    await homePage.navigate();
    await homePage.goToLogin();

    await loginPage.login('nonexistent@invalid.com', 'wrongpassword');
    await expect(loginPage.loginErrorMessage).toBeVisible();
  });
});
