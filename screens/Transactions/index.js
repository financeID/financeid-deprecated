import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { auth } from '../../components/Firebase/firebase';
import formatedValue from '../../utils/formatValue';
import { dateISO8601, formatedDate } from '../../utils/formatedDate';
import MyStatusBar from '../../hooks/statusBar';
import { Ionicons } from '@expo/vector-icons';
import MonthPicker from '../../components/MonthPicker';
//import FilterTransactions from '../FilterTransactions';
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

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(dateTransformed);
  //const [typeFilter, setTypeFilter] = useState(null);
  //const [tagFilter, setTagFilter] = useState(null);

  const dateTransformedToMonth = format(
    new Date(date + '-02'),
    "MMMM 'de' yyyy",
    {
      locale: pt,
    },
  );

  const rangeDate = date + '-02';

  const startDate = dateISO8601(startOfMonth(new Date(rangeDate)));
  const endDate = dateISO8601(endOfMonth(new Date(rangeDate)));

  useEffect(() => {
    setLoading(true);

    let unsubscribe = firebase
      .firestore()
      .collection('transactions')
      .where('userReference', '==', uid)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)

      /*switch (typeFilter) {
      case 'income':
        unsubscribe = unsubscribe.where('type', '==', 'income');
        break;
      case 'outcome':
        unsubscribe = unsubscribe.where('type', '==', 'outcome');
        break;
      default:
        break;
    }

    if (tagFilter) {
      unsubscribe = unsubscribe.where('tag', '==', tagFilter);
    }

    unsubscribe*/ .onSnapshot(
        querySnapshot => {
          let returnArr = [];

          querySnapshot.forEach(doc => {
            let item = doc.data();
            item.key = doc.id;

            returnArr.push(item);
          });

          setTransactions(returnArr);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [uid, date, rangeDate, startDate, endDate]);

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
              {/*<FilterTransactions
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
              />*/}
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
                          {formatedDate(new Date(date))}
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
                        <Ionicons
                          name="chevron-forward"
                          size={24}
                          color="#dedede"
                        />
                      </RightContentButton>
                    </View>
                  </TransactionContainer>
                );
              },
            )}
          </TransactionScrollView>
        )}
      </SafeArea>
    </>
  );
}
