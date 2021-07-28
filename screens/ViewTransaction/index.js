import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as firebase from 'firebase';
import { showMessage } from 'react-native-flash-message';
import { ScrollView, View, Text, Alert } from 'react-native';
import { auth } from '../../components/Firebase/firebase';
import { Feather } from '@expo/vector-icons';
import Colors from '../../utils/colors';
import { Container } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createTwoButtonAlert()}
          style={{ padding: 10 }}
        >
          <Feather name="trash" size={22} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });

    const deleteTransaction = () => {
      firebase
        .firestore()
        .collection('transactions')
        .doc(route.params.key)
        .delete();
    };

    const createTwoButtonAlert = () => {
      Alert.alert(
        'Tem certeza?',
        'Se sim, clique em excluir',
        [
          {
            text: 'Cancelar',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Excluir',
            onPress: () => {
              deleteTransaction(route.params.key);

              navigation.goBack();

              showMessage({
                animationDuration: 400,
                message: 'Transação deletada',
                backgroundColor: Colors.income,
                autoHide: true,
                position: 'bottom',
              });
            },
          },
        ],
        { cancelable: false },
      );
    };
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
