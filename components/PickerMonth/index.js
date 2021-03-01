import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from './styles';

export default function PickerMonth({ date, setDate }) {
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
    <Picker>
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
        onValueChange={value => {
          setDate(value);
        }}
        InputAccessoryView={() => null}
        items={[
          { label: 'Janeiro', value: '1/2021' },
          { label: 'Fevereiro', value: '2/2021' },
          { label: 'Março', value: '3/2021' },
        ]}
        Icon={() => {
          return <Ionicons name="filter" size={24} color="black" />;
        }}
      />
    </Picker>
  );
}
