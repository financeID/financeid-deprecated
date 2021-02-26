import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import Colors from '../utils/colors';

export default function AppTextInput({
  leftIcon,
  width = '100%',
  rightIcon,
  descTitle,
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
      <View style={{flex: 1}}>
        {descTitle && <Text style={styles.descTitle}>{descTitle}</Text>}
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.mediumGrey}
          {...otherProps}
        />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    flexDirection: 'row',
    marginVertical: 0,
  },
  icon: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  descTitle: {
    paddingTop: 15,
    paddingLeft: 15,
    bottom: -5,
    fontWeight: 'bold',
    color: '#8895A5',
    textTransform: 'uppercase',
  },
  input: {
    padding: 15,
    width: '100%',
    fontSize: Platform.OS === 'ios' ? 19 : 16,
    lineHeight: 26,
    color: Colors.black,
  },
  rightIconStyles: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingRight: 15,
  },
});
