import { sharedHello } from '@stellarsales/shared';
import { loadEnv } from './env';

function main(): void {
  // Placeholder boot for backend service
  // NestJS app will be wired later; for now ensure TypeScript pipeline works
  // eslint-disable-next-line no-console
  const env = loadEnv();
  console.log('Backend placeholder running.');
  console.log({ port: env.PORT, nodeEnv: env.NODE_ENV });
  console.log(sharedHello());
}

main();


