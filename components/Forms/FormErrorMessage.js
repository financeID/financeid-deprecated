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
    color: '#c76161',
    fontSize: 14,
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
});
