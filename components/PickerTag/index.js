import React from 'react';
import { useFormikContext } from 'formik';

import { StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import Colors from '../../utils/colors';

export default function PickerTag({ name, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext();

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
    <React.Fragment>
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
          placeholder: {
            color: '#8895A5',
          },
        }}
        placeholder={{ label: '', value: null }}
        useNativeAndroidPickerStyle={false}
        value={values[name]}
        loca
        onValueChange={value => setFieldValue(name, value)}
        onBlur={() => setFieldTouched(name)}
        InputAccessoryView={() => null}
        items={[
          { label: 'Viagem', value: 'viagem' },
          { label: 'Educação', value: 'educação' },
          { label: 'Automóvel', value: 'automóvel' },
          { label: 'Casa', value: 'casa' },
          { label: 'Comer fora', value: 'comer fora' },
          { label: 'Refeição', value: 'refeição' },
          { label: 'Lazer', value: 'lazer' },
          { label: 'Outros', value: 'outros' },
        ]}
        Icon={() => {
          return (
            <Ionicons
              name="pricetag-outline"
              size={Platform.OS === 'ios' ? 20 : 21}
              color={Colors.mediumGrey}
            />
          );
        }}
        {...otherProps}
      />

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
