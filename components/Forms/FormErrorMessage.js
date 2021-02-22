import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function FormErrorMessage({error, visible}) {
  if (!error || !visible) {
    return null;
  }

  return <Text style={styles.errorText}>{error}</Text>;
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 20,
    marginTop: 5,
  },
});
