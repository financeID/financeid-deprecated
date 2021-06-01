import React from 'react';
import { useFormikContext } from 'formik';

import { StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import Colors from '../../utils/colors';

export default function PickerTag({ name, ...otherProps }) {
  const { setFieldTouched, setFieldValue, values } = useFormikContext();

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      color: Colors.black,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 7,
      paddingRight: 10,
      width: '100%',
      fontSize: Platform.OS === 'ios' ? 19 : 16,
    },
    inputAndroid: {
      color: Colors.black,
      paddingTop: 15,
      paddingBottom: 15,
      paddingLeft: 7,
      paddingRight: 10,
      width: '100%',
      fontSize: Platform.OS === 'ios' ? 19 : 16,
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
          paddingTop: Platform.OS === 'ios' ? 0 : 10,
        },
        placeholder: {},
      }}
      placeholder={{}}
      useNativeAndroidPickerStyle={false}
      value={values[name]}
      onValueChange={value => setFieldValue(name, value)}
      onBlur={() => setFieldTouched(name)}
      InputAccessoryView={() => null}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
      Icon={() => {
        return (
          <Ionicons
            name="pricetag-outline"
            size={Platform.OS === 'ios' ? 24 : 21}
            color="black"
          />
        );
      }}
      {...otherProps}
    />
  );
}
