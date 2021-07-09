import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Button } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import { sort } from '../../utils/filter';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
import useStatusBar from '../../hooks/useStatusBar';
import { Ionicons } from '@expo/vector-icons';

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

  const { uid } = auth.currentUser;

  const [transactions, setTransactions] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {}}
          title="+"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data.on('value', snapshot => {
      setTransactions(sort(snapshot));
    });
  }, [uid]);

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
