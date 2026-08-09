export const typography = {
  fontFamily: 'Inter, system-ui, sans-serif',
  /** Wordmark / logo text — DejaVu Sans Bold */
  fontFamilyBrand: "'DejaVu Sans', sans-serif",
  fontFamilyBrandNative: 'DejaVuSans-Bold',
  headlineLg: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: -0.02,
  },
  headlineLgMobile: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
    letterSpacing: -0.02,
  },
  headlineMd: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.01,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  labelLg: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.01,
  },
  labelSm: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },
} as const;
