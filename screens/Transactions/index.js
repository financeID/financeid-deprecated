import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { auth } from '../../components/Firebase/firebase';
import { sort } from '../../utils/filter';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
import MyStatusBar from '../../hooks/statusBar';
import { Ionicons } from '@expo/vector-icons';
import MonthPicker from '../../components/MonthPicker';
import FilterTransactions from '../FilterTransactions';

import {
  SafeArea,
  Container,
  HeaderContainer,
  Header,
  TransactionScrollView,
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
  const dateTransformed = format(new Date(), 'yyyy-MM', {
    locale: pt,
  }).toString();

  const { uid } = auth.currentUser;

  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(dateTransformed);
  const [filter, setFilter] = useState({
    type: null,
    tag: null,
  });

  const dateTransformedToMonth = format(
    new Date(date + '-02'),
    "MMMM 'de' yyyy",
    {
      locale: pt,
    },
  );

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
    <>
      <MyStatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <SafeArea>
        <Container>
          <HeaderContainer>
            <Header>
              Transações de {'\n'}
              {dateTransformedToMonth}
            </Header>
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              {dateTransformed !== date && (
                <TouchableOpacity
                  onPress={() => setDate(dateTransformed)}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: 40,
                    height: 40,
                  }}
                >
                  <Ionicons name="refresh" size={24} color="#353535" />
                </TouchableOpacity>
              )}
              <FilterTransactions setFilter={setFilter} />
              <MonthPicker date={date} setDate={setDate} />
            </View>
          </HeaderContainer>
        </Container>
        <TransactionScrollView>
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
        </TransactionScrollView>
      </SafeArea>
    </>
  );
}
