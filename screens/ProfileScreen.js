import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { auth } from '../components/Firebase/firebase';
import { logout } from '../components/Firebase/firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';

export default function ProfileScreen() {
  const { email } = auth.currentUser;

  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  async function cloud() {
    const data2 = await firebase.firestore();

    const asdk = data2.collection('transactions').doc('mario');

    asdk
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Button title="Sair da conta" onPress={handleSignOut} />
      <Button title="firestoer" onPress={cloud} />
      <Text>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
