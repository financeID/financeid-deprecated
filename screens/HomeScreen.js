import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import * as firebase from 'firebase';
import useStatusBar from '../hooks/useStatusBar';
import { auth, logout } from '../components/Firebase/firebase';

export default function HomeScreen() {
  useStatusBar('dark-content');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const { uid } = auth.currentUser;

  useEffect(() => {
    const data = firebase.database().ref('users/' + uid);

    data.once('value', (snapshot) => {
      const { firstName, email } = snapshot.val();

      setName(firstName);
      setEmail(email);
    });
  }, []);

  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleSignOut} />
      <Text>UID: {uid}</Text>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
