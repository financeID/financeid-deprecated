import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import FlashMessage from 'react-native-flash-message';
import { format, startOfMonth, endOfMonth, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { auth } from '../../components/Firebase/firebase';
import formatedValue from '../../utils/formatValue';
import { dateISO8601, formatedDate } from '../../utils/formatedDate';
import MyStatusBar from '../../hooks/statusBar';
import { Ionicons } from '@expo/vector-icons';
import MonthPicker from '../../components/MonthPicker';
import FilterTransactions from '../FilterTransactions';
import ViewTransaction from '../ViewTransaction';
import Colors from '../../utils/colors';

import {
  SafeArea,
  LoadingContainer,
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
  RightContentButton,
} from './styles';

export default function ConfigScreen({ navigation }) {
  const dateTransformed = format(new Date(), 'yyyy-MM', {
    locale: pt,
  }).toString();

  const { uid } = auth.currentUser;

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(dateTransformed);
  const [typeFilter, setTypeFilter] = useState(null);
  const [tagFilter, setTagFilter] = useState(null);

  const dateTransformedToMonth = format(
    new Date(date + '-02'),
    "MMMM 'de' yyyy",
    {
      locale: pt,
    },
  );

  const rangeDate = date + '-02';

  useEffect(() => {
    const startDate = dateISO8601(startOfMonth(new Date(rangeDate)));
    const endDate = dateISO8601(endOfMonth(new Date(rangeDate)));

    let query = firebase
      .firestore()
      .collection('transactions')
      .where('userReference', '==', uid)
      .where('date', '<=', endDate)
      .where('date', '>=', startDate);

    switch (typeFilter) {
      case 'income':
        query = query.where('type', '==', 'income');
        break;
      case 'outcome':
        query = query.where('type', '==', 'outcome');
        break;
      default:
        break;
    }

    if (tagFilter) {
      query = query.where('tag', '==', tagFilter);
    }

    query.onSnapshot(querySnapshot => {
      let returnArr = [];

      querySnapshot.forEach(doc => {
        let item = doc.data();
        item.key = doc.id;

        returnArr.push(item);
      });

      setTransactions(returnArr);
      setLoading(false);
    });
  }, [uid, date, rangeDate, typeFilter, tagFilter]);

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
                  onPress={() => {
                    setDate(dateTransformed);
                  }}
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
              <FilterTransactions
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
              />
              <MonthPicker date={date} setDate={setDate} />
            </View>
          </HeaderContainer>
        </Container>

        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color={Colors.secondary} />
          </LoadingContainer>
        ) : (
          <TransactionScrollView>
            {transactions.map(
              ({ key, description, tag, date, type, price }) => {
                return (
                  <TransactionContainer key={key}>
                    <TransactionInfo>
                      <TransactionText>{description}</TransactionText>
                      <InfoView>
                        <TransactionDate>
                          {formatedDate(addDays(new Date(date), 1))}
                          {' - '}
                        </TransactionDate>
                        <TransactionTag>{tag}</TransactionTag>
                      </InfoView>
                    </TransactionInfo>

                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <TransactionPrice type={type}>
                        {type === 'outcome' && ' - '}
                        {formatedValue(Number(price))}
                      </TransactionPrice>
                      <RightContentButton
                        onPress={() =>
                          navigation.navigate('ViewTransaction', {
                            key: key,
                            description: description,
                          })
                        }
                      >
                        <ViewTransaction />
                      </RightContentButton>
                    </View>
                  </TransactionContainer>
                );
              },
            )}
          </TransactionScrollView>
        )}

        <FlashMessage position="bottom" />
      </SafeArea>
    </>
  );
}
