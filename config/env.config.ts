export const envConfig = {
  baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
  timeout: Number(process.env.TIMEOUT) || 30_000,
  retries: Number(process.env.RETRIES) || 1,
  headless: process.env.HEADLESS !== 'false',
  screenshotOnFailure: true,
  traceOnFailure: true,
};
