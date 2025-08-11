import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { sharedHello } from '@stellarsales/shared';

export default function HomeScreen() {
  const { data, isLoading } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => {
      // Example placeholder API call
      await new Promise((r) => setTimeout(r, 400));
      return { message: sharedHello() };
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text testID="helloText">{data?.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
});


