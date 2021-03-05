import React from 'react';
import { useFormikContext } from 'formik';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../utils/colors';
import AppTextInput from '../AppTextInput';
import FormErrorMessage from './FormErrorMessage';

export default function FormField({
  descTitle,
  leftIcon,
  rightIcon,
  width = '100%',
  type,
  name,
  ...otherProps
}) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched,
  } = useFormikContext();

  return (
    <React.Fragment>
      {type ? (
        <>
          {descTitle && <Text style={styles.descTitle}>{descTitle}</Text>}
          <View style={[styles.container, { width }]}>
            {leftIcon && (
              <MaterialCommunityIcons
                name={leftIcon}
                size={20}
                color={Colors.mediumGrey}
                style={styles.icon}
              />
            )}
            <View style={{ flex: 1 }}>
              <TextInputMask
                type={'datetime'}
                options={{
                  format: 'YYYY-MM-DD',
                }}
                value={values[name]}
                placeholderTextColor={Colors.mediumGrey}
                onChangeText={text => setFieldValue(name, text)}
                onBlur={() => setFieldTouched(name)}
                style={styles.input}
                {...otherProps}
              />
            </View>
            {rightIcon && (
              <TouchableOpacity onPress={() => {}}>
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={20}
                  color={Colors.mediumGrey}
                  style={styles.rightIconStyles}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      ) : (
        <AppTextInput
          descTitle={descTitle}
          value={values[name]}
          onChangeText={text => setFieldValue(name, text)}
          onBlur={() => setFieldTouched(name)}
          width={width}
          {...otherProps}
        />
      )}

      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
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
    bottom: -10,
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
