import AxeBuilder from '@axe-core/playwright';
import { test, expect } from '@playwright/test';

async function assertNoBlockingAxe(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter(
    (v) =>
      v.id === 'page-has-heading-one' ||
      v.id === 'region' ||
      v.impact === 'serious' ||
      v.impact === 'critical',
  );
  expect(
    blocking,
    blocking.map((v) => `${v.id} (${v.impact}): ${v.help}`).join('\n'),
  ).toEqual([]);
}

test.describe('ChitChat V2 M1 web shells', () => {
  test('loads the authentication shell with accessible heading', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto('/auth');
    await expect(page.getByRole('heading', { name: 'ChitChat', level: 1 })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByPlaceholder('Enter your password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Create account' })).toBeDisabled();

    await expect(page.getByText('Select a Room', { exact: false })).toHaveCount(0);
    await expect(page.getByRole('combobox')).toHaveCount(0);
    await expect(page.getByText(/General|Sports|Tech|Gaming/)).toHaveCount(0);
    await expect(page.getByRole('button', { name: /dark mode|toggle dark/i })).toHaveCount(0);
    await expect(page.getByLabel(/dark mode/i)).toHaveCount(0);

    expect(consoleErrors, `Uncaught page errors: ${consoleErrors.join('; ')}`).toEqual([]);
  });

  test('skip link moves focus to main content', async ({ page }) => {
    await page.goto('/auth');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();

    const box = await skip.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.width).toBeGreaterThanOrEqual(44);

    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
  });

  test('mobile viewport renders the mobile shell without horizontal overflow', async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/mobile');

    await expect(page.getByRole('heading', { name: 'Chats', level: 1 })).toBeVisible();
    const bottomNav = page.getByRole('navigation', { name: 'Primary' });
    await expect(bottomNav).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });
    expect(hasHorizontalOverflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('tablet route exposes a single Chats h1 and conversation h2', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/tablet');

    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Chats', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Conversation', level: 2 })).toBeVisible();
  });

  test('desktop viewport renders the three-panel shell', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/desktop');

    await expect(page.getByRole('navigation', { name: 'Desktop primary' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Chats', level: 1 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alex', level: 2 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send' })).toBeDisabled();
    expect(consoleErrors).toEqual([]);
  });

  test('disabled placeholder actions cannot activate', async ({ page }) => {
    await page.goto('/empty');
    const findPeople = page.getByRole('button', { name: 'Find people' });
    await expect(findPeople).toBeDisabled();
    await findPeople.click({ force: true }).catch(() => undefined);
    await expect(page.getByRole('heading', { name: 'No conversations yet', level: 1 })).toBeVisible();
  });

  test('axe: auth 390 has no blocking violations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/auth');
    await assertNoBlockingAxe(page);
  });

  test('axe: mobile 390 has no blocking violations', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/mobile');
    await assertNoBlockingAxe(page);
  });

  test('axe: tablet 768 has no blocking violations', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/tablet');
    await assertNoBlockingAxe(page);
  });

  test('axe: desktop 1440 has no blocking violations', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/desktop');
    await assertNoBlockingAxe(page);
  });
});
