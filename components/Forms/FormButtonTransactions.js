import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

export default function FormButtonTransactions({ title }) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity style={[styles.button]} onPress={handleSubmit}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#5c5b5c',
    fontSize: 18,
  },
});
