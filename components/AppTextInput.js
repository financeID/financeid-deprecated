import React from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Colors from '../utils/colors';

export default function AppTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) {
  return (
    <View style={[styles.container, {width}]}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={Colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.mediumGrey}
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={Colors.mediumGrey}
            style={styles.rightIconStyles}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F1F1F1',
    borderRadius: 5,
    flexDirection: 'row',
    marginVertical: 10,
  },
  icon: {
    padding: 15,
  },
  input: {
    flex: 1,
    width: '100%',
    fontSize: 18,
    color: Colors.black,
  },
  rightIconStyles: {
    padding: 15,
  },
});
