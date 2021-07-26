import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { ScrollView, View, Text } from 'react-native';
import 'firebase/firestore';
import { auth } from '../../components/Firebase/firebase';

import { Container } from './styles';

export default function ViewTransaction({ navigation, route }) {
  const { uid } = auth.currentUser;

  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('transactions')
      .where(firebase.firestore.FieldPath.documentId(), '==', route.params.key)
      .onSnapshot(querySnapshot => {
        let returnArr = [];

        querySnapshot.forEach(doc => {
          let item = doc.data();
          item.key = doc.id;

          returnArr.push(item);
        });

        setTransaction(returnArr);
      });
  }, [uid, route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.description,
    });
  }, [navigation, route]);

  return (
    <Container>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        {transaction.map(t => {
          return (
            <View key={t.key}>
              <Text>{t.description}</Text>
              <Text>{t.price}</Text>
              <Text>{t.key}</Text>
              <Text>{t.tag}</Text>
              <Text>{t.type}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
}
