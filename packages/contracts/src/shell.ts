import { z } from 'zod';

/** Application shell view modes for static M1 UI only. */
export const shellViewSchema = z.enum([
  'auth',
  'mobile',
  'tablet',
  'desktop',
  'loading',
  'empty',
  'offline',
  'error',
]);

export type ShellView = z.infer<typeof shellViewSchema>;
