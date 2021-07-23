import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { auth } from '../../components/Firebase/firebase';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import usedMonthsToArray from '../../utils/usedMonthsToArray';
import Colors from '../../utils/colors';
import { Picker, iconContainer, placeholder } from './styles';

function MonthPicker({ date, setDate }) {
  const { uid } = auth.currentUser;

  const [usedMonths, setUsedMonths] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('transactions')
      .where('userReference', '==', uid)
      .onSnapshot(querySnapshot => {
        setUsedMonths(usedMonthsToArray(querySnapshot));
      });
  }, [uid]);
  return (
    <Picker>
      <RNPickerSelect
        style={{
          ...pickerSelectStyles,
          iconContainer,
          placeholder,
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
          return <Ionicons name="filter" size={23} color={Colors.primary} />;
        }}
      />
    </Picker>
  );
}

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

export default MonthPicker;
