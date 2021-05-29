import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { logout } from '../components/Firebase/firebase';

export default function ProfileScreen() {
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Sair da conta" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
