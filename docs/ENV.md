# Environment variables

Create a `.env.local` file at the repo root with values for local development. The backend reads `.env.local` first, then `.env`.

Example:

```
NODE_ENV=development
PORT=3000
DATABASE_URL=https://example.com/db
S3_BUCKET=stellarsales-bucket
S3_ENDPOINT=https://example.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
JWT_SECRET=please-change-me-32chars-min
```

Validation
- Env variables are validated at runtime using a shared Zod schema (`@stellarsales/shared/src/env.ts`).
- Missing or invalid variables will cause startup to fail fast with a descriptive error.
