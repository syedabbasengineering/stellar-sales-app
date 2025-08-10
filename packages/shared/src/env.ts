import { z } from 'zod';

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  S3_BUCKET: z.string(),
  S3_ENDPOINT: z.string().url().optional(),
  S3_ACCESS_KEY_ID: z.string(),
  S3_SECRET_ACCESS_KEY: z.string(),
  JWT_SECRET: z.string().min(16),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const input: Record<string, string> = {};
  for (const key of Object.keys(serverEnvSchema.shape)) {
    const value = source[key];
    if (value !== undefined) {
      input[key] = value;
    }
  }
  return serverEnvSchema.parse(input);
}


