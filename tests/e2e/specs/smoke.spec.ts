import { test, expect } from '@playwright/test';

test.describe('ChitChat V2 M1 web shells', () => {
  test('loads the authentication shell with accessible heading', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.goto('/auth');
    await expect(page.getByRole('heading', { name: 'ChitChat', level: 1 })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

    await expect(page.getByText('Select a Room', { exact: false })).toHaveCount(0);
    await expect(page.getByRole('combobox')).toHaveCount(0);
    await expect(page.getByText(/General|Sports|Tech|Gaming/)).toHaveCount(0);
    await expect(page.getByRole('button', { name: /dark mode|toggle dark/i })).toHaveCount(0);
    await expect(page.getByLabel(/dark mode/i)).toHaveCount(0);

    expect(consoleErrors, `Uncaught page errors: ${consoleErrors.join('; ')}`).toEqual([]);
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
    await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });
    expect(hasHorizontalOverflow).toBe(false);
    expect(consoleErrors).toEqual([]);
  });

  test('desktop viewport renders the three-panel shell', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/desktop');

    await expect(page.getByRole('navigation', { name: 'Desktop primary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Chats', level: 2 })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Alex', level: 2 })).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
});
