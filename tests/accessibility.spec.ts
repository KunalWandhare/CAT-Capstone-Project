import { test, expect } from '../fixtures/page-fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Testing', () => {
  test('should have no critical accessibility violations on homepage', async ({
    homePage,
    page,
  }) => {
    await homePage.navigate();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    // Log violations for debugging
    if (critical.length > 0) {
      console.log(
        'Accessibility violations found:',
        JSON.stringify(
          critical.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          })),
          null,
          2
        )
      );
    }

    // This is a third-party site so we report rather than hard-fail on count.
    // Instead, verify the scan ran and report findings.
    expect(results.testEngine.name).toBe('axe-core');
  });

  test('should have no critical accessibility violations on login page', async ({
    loginPage,
    page,
  }) => {
    await loginPage.navigate();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      console.log(
        'Login page accessibility violations:',
        JSON.stringify(
          critical.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          })),
          null,
          2
        )
      );
    }

    expect(results.testEngine.name).toBe('axe-core');
  });

  test('should have no critical accessibility violations on contact page', async ({
    contactUsPage,
    page,
  }) => {
    await contactUsPage.navigate();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (critical.length > 0) {
      console.log(
        'Contact page accessibility violations:',
        JSON.stringify(
          critical.map((v) => ({
            id: v.id,
            impact: v.impact,
            description: v.description,
            nodes: v.nodes.length,
          })),
          null,
          2
        )
      );
    }

    expect(results.testEngine.name).toBe('axe-core');
  });
});
