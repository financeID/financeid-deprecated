import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as firebase from 'firebase';
import { showMessage } from 'react-native-flash-message';
import { addDays } from 'date-fns';
import { ScrollView, View, Alert } from 'react-native';
import { auth } from '../../components/Firebase/firebase';
import { Feather } from '@expo/vector-icons';
import formatedValue from '../../utils/formatValue';
import { formatedDate } from '../../utils/formatedDate';
import Colors from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
//import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';
import TagPicker from '../../components/TagPicker';
import Calendar from '../../components/Calendar';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

import {
  SafeArea,
  Container,
  TransactionContainer,
  TransactionInfo,
  TransactionText,
  TransactionDate,
  TransactionTag,
  InfoView,
  TransactionPrice,
  TransactionDetails,
  TextDetail,
} from './styles';

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
            <SafeArea key={t.key}>
              <TransactionContainer>
                <TransactionInfo>
                  <TransactionText>{t.description}</TransactionText>
                  <InfoView>
                    <TransactionDate>
                      {formatedDate(addDays(new Date(t.date), 1))}
                      {' - '}
                    </TransactionDate>
                    <TransactionTag>{t.tag}</TransactionTag>
                  </InfoView>
                </TransactionInfo>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TransactionPrice type={t.type}>
                    {t.type === 'outcome' && ' - '}
                    {formatedValue(Number(t.price))}
                  </TransactionPrice>
                </View>
              </TransactionContainer>

              <TransactionDetails>
                <TextDetail>Detalhes</TextDetail>
              </TransactionDetails>

              <Form
                initialValues={{
                  description: t.description,
                  value: t.price,
                  date: '',
                  tag: t.tag,
                  type: '',
                }}
                onSubmit={() => {}}
              >
                <SegmentedControl
                  style={{ marginTop: 15, marginBottom: 10 }}
                  values={['Entrada', 'Saída']}
                  name="type"
                  selectedIndex={t.type}
                  onChange={event => {
                    setType(event.nativeEvent.selectedSegmentIndex);
                  }}
                />
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                >
                  <FormField
                    placeholder="Descrição"
                    name="description"
                    autoCapitalize="sentences"
                  />
                  <FormField
                    placeholder="Valor"
                    name="value"
                    type={'money'}
                    options={{
                      precision: 2,
                      separator: '.',
                      delimiter: ',',
                      unit: '',
                      suffixUnit: '',
                    }}
                    keyboardType={'numeric'}
                    autoCapitalize="none"
                  />

                  <TagPicker
                    placeholder="Tag"
                    name="tag"
                    tag={t.tag}
                    navigation={navigation}
                  />
                  <Calendar name="date" />
                </ScrollView>
              </Form>
            </SafeArea>
          );
        })}
      </ScrollView>
    </Container>
  );
}
