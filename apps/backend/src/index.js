import express from 'express';
import { sharedHello } from '@stellarsales/shared';
import { loadEnv } from './env.js';
import { AccessToken } from 'livekit-server-sdk';

function createApp() {
  const app = express();
  app.get('/health', (_req, res) => {
    res.json({ ok: true, message: sharedHello() });
  });

  app.get('/livekit/token', (req, res) => {
    const env = loadEnv();
    const { identity = 'mobile-dev', roomName = 'dev-room' } = req.query;
    if (!env.LIVEKIT_API_KEY || !env.LIVEKIT_API_SECRET) {
      return res.status(500).json({ error: 'LiveKit not configured' });
    }
    const at = new AccessToken(env.LIVEKIT_API_KEY, env.LIVEKIT_API_SECRET, {
      identity: String(identity),
      ttl: '10m',
    });
    at.addGrant({ roomJoin: true, room: String(roomName) });
    const jwt = at.toJwt();
    return res.json({ token: jwt, url: env.LIVEKIT_URL });
  });
  return app;
}

function main() {
  const env = loadEnv();
  const app = createApp();
  app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${env.PORT}`);
  });
}

main();