import React from 'react';
import {StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import {Picker} from './styles';

export default function PickerMonth({month, setMonth}) {
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
        value={month}
        placeholder={{}}
        useNativeAndroidPickerStyle={false}
        onValueChange={(value) => setMonth(value)}
        InputAccessoryView={() => null}
        items={[
          {label: 'Janeiro', value: 1},
          {label: 'Fevereiro', value: 2},
          {label: 'Março', value: 3},
          {label: 'Java', value: 'Java'},
          {label: 'C++', value: 'C++'},
          {label: 'C', value: 'C'},
        ]}
        Icon={() => {
          return <Ionicons name="filter" size={24} color="black" />;
        }}
      />
    </Picker>
  );
}
