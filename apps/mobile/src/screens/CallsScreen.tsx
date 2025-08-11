import React from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { fetchLiveKitToken } from '../services/api';

export default function CallsScreen() {
  const [lastToken, setLastToken] = React.useState<string | null>(null);
  const [lastUrl, setLastUrl] = React.useState<string | undefined>(undefined);
  const tokenMutation = useMutation({
    mutationFn: async () => {
      const identity = 'mobile-dev';
      const roomName = 'dev-room';
      return fetchLiveKitToken(identity, roomName);
    },
    onSuccess: (data) => {
      setLastToken(data.token);
      setLastUrl(data.url);
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : 'Unknown error';
      Alert.alert('Token error', message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calls</Text>
      <Button title="Get LiveKit Token" onPress={() => tokenMutation.mutate()} />
      {tokenMutation.isPending && <ActivityIndicator style={{ marginTop: 12 }} />}
      {lastToken && (
        <View style={{ marginTop: 12 }}>
          <Text numberOfLines={1} ellipsizeMode="middle">
            Token: {lastToken}
          </Text>
          {lastUrl ? <Text>URL: {lastUrl}</Text> : null}
        </View>
      )}
      <Text style={{ marginTop: 16, color: '#666' }}>
        Next: integrate LiveKit React Native client to join room.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
});


