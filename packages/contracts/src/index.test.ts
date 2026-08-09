import { describe, expect, it } from 'vitest';
import { healthResponseSchema, shellViewSchema, apiEnvSchema } from './index.js';

describe('contracts', () => {
  it('parses a valid health response', () => {
    const parsed = healthResponseSchema.parse({
      status: 'ok',
      service: 'chitchat-api',
      version: '2.0.0-m1',
      timestamp: new Date().toISOString(),
    });
    expect(parsed.status).toBe('ok');
  });

  it('accepts approved shell views only', () => {
    expect(shellViewSchema.parse('desktop')).toBe('desktop');
    expect(() => shellViewSchema.parse('dark')).toThrow();
  });

  it('applies API env defaults without requiring MONGO_URI', () => {
    const env = apiEnvSchema.parse({});
    expect(env.PORT).toBe(5000);
    expect(env.MONGO_URI).toBe('');
  });
});
