import * as fs from 'node:fs';
import * as path from 'node:path';
import { config as dotenv } from 'dotenv';
import { parseServerEnv, type ServerEnv } from '@stellarsales/shared/src/env';

export function loadEnv(): ServerEnv {
  const envFiles = [
    '.env.local',
    '.env',
  ];
  for (const filename of envFiles) {
    const fullPath = path.resolve(process.cwd(), filename);
    if (fs.existsSync(fullPath)) {
      dotenv({ path: fullPath, override: true });
    }
  }
  return parseServerEnv(process.env as Record<string, string | undefined>);
}


