import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({navigation}) {
  useStatusBar('dark-content');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.subtitle}>FinanceID</Text>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  logo: {
    width: 125,
    height: 125,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.primary,
  },
  buttonContainer: {
    padding: 20,
    width: '100%',
  },
});
