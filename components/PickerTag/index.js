import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

export default function PickerTag({ date }) {
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      color: 'transparent',
      width: 60,
      height: 50,
    },
    inputAndroid: {
      color: 'transparent',
      width: 60,
      height: 50,
    },
  });

  return (
    <RNPickerSelect
      style={{
        ...pickerSelectStyles,
        iconContainer: {
          width: 60,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          margin: 0,
        },
        placeholder: {
          fontSize: 0,
        },
      }}
      value={date}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      onValueChange={() => {}}
      InputAccessoryView={() => null}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
      Icon={() => {
        return <Ionicons name="filter" size={24} color="black" />;
      }}
    />
  );
}
