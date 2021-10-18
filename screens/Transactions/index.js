import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { auth } from '../../components/Firebase/firebase';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
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
  NoTransactions,
  ArrowIcon,
  NoTransactionsText,
} from './styles';

import UpArrowIcon from '../../assets/up-arrow.svg';
import DownArrowIcon from '../../assets/down-arrow.svg';

export default function ConfigScreen({ navigation }) {
  const dateTransformed = format(new Date(), 'yyyy-MM').toString();

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

  useEffect(() => {
    setLoading(true);

    const startDate = startOfMonth(new Date(rangeDate));
    const endDate = endOfMonth(new Date(rangeDate));

    const unsubscribe = firebase
      .firestore()
      .collection('transactions')
      .where('userReference', '==', uid)
      .where('date', '>=', startDate)
      .where('date', '<=', endDate)
      .onSnapshot(querySnapshot => {
        let returnArr = [];

        querySnapshot.forEach(doc => {
          let item = doc.data();
          item.key = doc.id;

          returnArr.push(item);
        });

        setTransactions(returnArr);
      });

    setLoading(false);

    return () => unsubscribe();
  }, [uid, date, rangeDate]);

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
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              backgroundColor: '#f8f8ff',
            }}
          >
            {transactions.length ? (
              <TransactionScrollView>
                {transactions.map(
                  ({ key, description, tag, date, type, price }) => {
                    return (
                      <TransactionContainer key={key}>
                        <TransactionInfo>
                          <TransactionText>{description}</TransactionText>
                          <InfoView>
                            <TransactionDate>
                              {formatedDate(date.toDate())}
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
            ) : (
              <NoTransactions>
                <ArrowIcon>
                  <UpArrowIcon
                    height={30}
                    width={30}
                    style={{ paddingLeft: 35 }}
                  />
                  <DownArrowIcon
                    height={30}
                    width={30}
                    style={{ paddingLeft: 35 }}
                  />
                </ArrowIcon>
                <NoTransactionsText>
                  Não há transações {'\n'}nesse mês
                </NoTransactionsText>
              </NoTransactions>
            )}
          </View>
        )}
      </SafeArea>
    </>
  );
}
