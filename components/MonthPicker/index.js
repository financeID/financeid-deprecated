import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import usedMonthsToArray from '../../utils/usedMonthsToArray';
import { Picker } from './styles';

export default function MonthPicker({ date, setDate }) {
  const { uid } = auth.currentUser;

  const [usedMonths, setUsedMonths] = useState([]);

  useEffect(() => {
    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data.on('value', snapshot => {
      setUsedMonths(usedMonthsToArray(snapshot));
    });
  }, [uid]);

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
        items={usedMonths}
        Icon={() => {
          return <Ionicons name="filter" size={24} color="black" />;
        }}
      />
    </Picker>
  );
}
