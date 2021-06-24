import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { auth } from '../components/Firebase/firebase';
import { logout } from '../components/Firebase/firebase';

export default function ProfileScreen() {
  const { email } = auth.currentUser;

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
      <Text>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
