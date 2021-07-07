import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import snapshotToArray from '../../utils/snapshotToArray';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
import useStatusBar from '../../hooks/useStatusBar';
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  HeaderContainer,
  Header,
  TransactionContainer,
  TransactionInfo,
  TransactionText,
  TransactionDate,
  TransactionTag,
  InfoView,
  TransactionPrice,
  RightContent,
} from './styles';

export default function ConfigScreen() {
  useStatusBar('dark-content');

  const { uid } = auth.currentUser;

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data.orderByChild('created_at').on('value', snapshot => {
      setTransactions(snapshotToArray(snapshot));
    });
  }, [uid]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView style={{ height: '100%' }}>
          <Container>
            <HeaderContainer>
              <Header>
                Transações de {'\n'}
                fevereiro
              </Header>
            </HeaderContainer>

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
                    <RightContent>
                      <TransactionPrice type={type}>
                        {type === 'outcome' && ' - '}
                        {formatedValue(Number(price))}
                      </TransactionPrice>
                      <Ionicons
                        name="chevron-forward"
                        size={24}
                        color="#dedede"
                      />
                    </RightContent>
                  </TransactionContainer>
                );
              },
            )}
          </Container>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
