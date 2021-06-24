import React from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Button({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.view}
      onPress={() => navigation.navigate('manageTags')}
    >
      <MaterialCommunityIcons
        name="tag-plus-outline"
        size={Platform.OS === 'ios' ? 20 : 21}
        color="black"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingRight: 10,
  },
});
