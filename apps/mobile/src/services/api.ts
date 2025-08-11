import { Platform } from 'react-native';

function getApiBaseUrl(): string {
  const envBase = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (envBase) return envBase;
  if (Platform.OS === 'android') return 'http://10.0.2.2:3000';
  return 'http://localhost:3000';
}

export type LiveKitTokenResponse = {
  token: string;
  url?: string;
};

export async function fetchLiveKitToken(
  identity: string,
  roomName: string
): Promise<LiveKitTokenResponse> {
  const base = getApiBaseUrl();
  const u = new URL('/livekit/token', base);
  u.searchParams.set('identity', identity);
  u.searchParams.set('roomName', roomName);
  const res = await fetch(u.toString());
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch token: ${res.status} ${text}`);
  }
  return res.json();
}


