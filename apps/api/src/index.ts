import { startServer } from './server.js';

startServer().catch((error: unknown) => {
  console.error('[api] failed to start', error);
  process.exit(1);
});
