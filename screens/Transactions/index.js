import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import * as firebase from 'firebase';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { auth } from '../../components/Firebase/firebase';
import { sort } from '../../utils/filter';
//import snapshotToArray from '../../utils/snapshotToArray';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
import useStatusBar from '../../hooks/useStatusBar';
import { Ionicons } from '@expo/vector-icons';
import MonthPicker from '../../components/MonthPicker';
import FilterTransactions from '../FilterTransactions';

import {
  Container,
  TransactionContainer,
  TransactionInfo,
  TransactionText,
  TransactionDate,
  TransactionTag,
  InfoView,
  TransactionPrice,
  RightContent,
} from './styles';

export default function ConfigScreen({ navigation }) {
  useStatusBar('dark-content');

  const dateTransformed = format(new Date(), 'yyyy-MM', {
    locale: pt,
  }).toString();

  const { uid } = auth.currentUser;

  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(dateTransformed);
  const [filter, setFilter] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FilterTransactions setFilter={setFilter} />
          <MonthPicker date={date} setDate={setDate} />
        </View>
      ),
    });
  }, [navigation, date]);

  useEffect(() => {
    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data.on('value', snapshot => {
      setTransactions(sort(snapshot, date, filter));
    });
  }, [uid, date, filter]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ height: '100%' }}>
        <Container>
          {transactions.map(({ key, description, tag, date, type, price }) => {
            return (
              <TransactionContainer key={key}>
                <TransactionInfo>
                  <TransactionText>{description}</TransactionText>
                  <InfoView>
                    <TransactionDate>
                      {formatedDate(new Date(date))}
                      {' - '}
                    </TransactionDate>
                    <TransactionTag>{tag}</TransactionTag>
                  </InfoView>
                </TransactionInfo>
                <RightContent>
                  <TransactionPrice type={type}>
                    {type === 'outcome' && ' - '}
                    {formatedValue(Number(price))}
                  </TransactionPrice>
                  <Ionicons name="chevron-forward" size={24} color="#dedede" />
                </RightContent>
              </TransactionContainer>
            );
          })}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
