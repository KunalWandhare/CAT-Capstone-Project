import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { AccountCreatedPage } from '../pages/account-created.page';
import { ProductsPage } from '../pages/products.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page';
import { ContactUsPage } from '../pages/contact-us.page';
import { loadJson, uniqueEmail } from '../utils/test-data-helper';

type UserData = {
  validUser: { name: string; email: string; password: string };
  registrationUsers: Array<{
    title: string;
    name: string;
    email: string;
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }>;
};

type ProductData = {
  searchTerms: Array<{ term: string; expectedMinResults: number }>;
  contactMessages: Array<{
    name: string;
    email: string;
    subject: string;
    message: string;
  }>;
};

type TestFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  productsPage: ProductsPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  contactUsPage: ContactUsPage;
  userData: UserData;
  productData: ProductData;
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  contactUsPage: async ({ page }, use) => {
    await use(new ContactUsPage(page));
  },

  userData: async ({}, use) => {
    await use(loadJson<UserData>('users.json'));
  },

  productData: async ({}, use) => {
    await use(loadJson<ProductData>('products.json'));
  },
});

export { expect } from '@playwright/test';
