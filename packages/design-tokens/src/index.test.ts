import { describe, expect, it } from 'vitest';
import { colors, spacing, breakpoints } from './index.js';

describe('design tokens', () => {
  it('exposes light-theme primary colour from Stitch', () => {
    expect(colors.primary).toBe('#063ac1');
    expect(colors.primaryContainer).toBe('#3155d9');
  });

  it('uses an 8px spacing unit and 44px touch target', () => {
    expect(spacing.unit).toBe(8);
    expect(spacing.touchTarget).toBe(44);
  });

  it('defines tablet and desktop breakpoints', () => {
    expect(breakpoints.tablet).toBe(768);
    expect(breakpoints.desktop).toBe(1024);
  });

  it('exposes DejaVu Sans Bold for brand wordmark text', async () => {
    const { typography } = await import('./index.js');
    expect(typography.fontFamilyBrand).toContain('DejaVu Sans');
    expect(typography.fontFamilyBrandNative).toBe('DejaVuSans-Bold');
  });
});
