import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { sharedHello } from '@stellarsales/shared';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Text style={styles.title}>StellarSales Mobile</Text>
        <Text style={styles.subtitle}>{sharedHello()}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666' },
});


