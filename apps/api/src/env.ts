import { apiEnvSchema, type ApiEnv } from '@chitchat/contracts';

export function loadEnv(source: NodeJS.ProcessEnv = process.env): ApiEnv {
  return apiEnvSchema.parse(source);
}
