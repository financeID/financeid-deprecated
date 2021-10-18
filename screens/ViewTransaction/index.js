import React, { useState, useEffect, useLayoutEffect } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Yup from 'yup';
import { showMessage } from 'react-native-flash-message';
import showToast from '../../utils/toastAndroid';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';
import { ActivityIndicator, ScrollView, Alert, Platform } from 'react-native';
import { auth } from '../../components/Firebase/firebase';
import { Feather } from '@expo/vector-icons';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import TagPicker from '../../components/TagPicker';
import Calendar from '../../components/Calendar';
import StatusSwitch from '../../components/StatusSwitch';
import Colors from '../../utils/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { formatedDatePtBR } from '../../utils/formatedDate';

import {
  LoadingContainer,
  Container,
  ContainerKeyboard,
  ViewButton,
} from './styles';

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Digite uma descrição para o item')
    .min(2, 'A descrição deve conter ao menos 3 caracteres')
    .max(20, 'A descrição deve conter no máximo 20 caracteres')
    .label('Description'),
  value: Yup.string()
    .typeError('O valor deve ser um número')
    .required('Digite o valor do item')
    .label('Value'),
  date: Yup.string()
    .min(10, 'Insira uma data')
    .required('A data é obrigatória')
    .label('Date'),
  tag: Yup.string()
    .required('Selecione uma tag')
    .min(2, 'A tag deve conter ao menos 3 caracteres')
    .max(20, 'A tag deve conter no máximo 10 caracteres')
    .nullable()
    .label('Tag'),
});

const renderScrollable = GestureResponderHandlers => (
  <ScrollView keyboardDismissMode="interactive" {...GestureResponderHandlers} />
);

export default function ViewTransaction({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { uid } = auth.currentUser;
  const [type, setType] = useState(0);
  const { Tag } = route.params;

  const [transaction, setTransaction] = useState({});
  const [transformedDate, setTransformedDate] = useState();

  useEffect(() => {
    setLoading(true);

    firebase
      .firestore()
      .collection('transactions')
      .where(firebase.firestore.FieldPath.documentId(), '==', route.params.key)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(doc => {
          const changeType = doc.data().type === 'income' ? 0 : 1;
          const { date } = doc.data();
          const transformToDate = date.toDate();
          setTransformedDate(transformToDate);

          setTransaction(doc.data());
          setType(changeType);
          setLoading(false);
        });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  }, [uid, route]);

  const handleTransactions = values => {
    setButtonLoading(true);

    const { description, value, date, tag, status } = values;

    const dateTranformed = formatedDatePtBR(date);

    const valueTransformed = value.replace(/,/g, '');
    const typeTransformed = type === 0 ? 'income' : 'outcome';

    firebase
      .firestore()
      .collection('transactions')
      .doc(route.params.key)
      .update({
        userReference: uid,
        status: status,
        description: description.trim(),
        price: valueTransformed,
        date: dateTranformed,
        tag: tag,
        type: typeTransformed.trim(),
      })
      .then(() => {
        navigation.navigate('Transações');

        setButtonLoading(false);

        Platform.OS === 'ios'
          ? showMessage({
              animationDuration: 500,
              message: 'Editado com sucesso',
              backgroundColor: Colors.income,
              autoHide: true,
              position: 'top',
            })
          : showToast({
              message: 'Editado com sucesso',
            });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.description,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createTwoButtonAlert()}
          style={{ padding: 10 }}
        >
          <Feather name="trash" size={21} color={Colors.primary} />
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
        'Se sim, clique em exluir',
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
            },
          },
        ],
        { cancelable: false },
      );
    };
  }, [navigation, route]);

  return (
    <>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={Colors.secondary} />
        </LoadingContainer>
      ) : (
        <Form
          initialValues={{
            description: transaction.description,
            value: transaction.price,
            date: '',
            tag: '',
            type: transaction.type,
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleTransactions(values)}
        >
          <Container>
            <SegmentedControl
              style={{ marginTop: 15, marginBottom: 10 }}
              values={['Entrada', 'Saída']}
              name="type"
              selectedIndex={type}
              onChange={event => {
                setType(event.nativeEvent.selectedSegmentIndex);
              }}
            />

            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              <StatusSwitch name="status" status={transaction.status} />
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
                tag={!Tag ? transaction.tag : Tag}
                name="tag"
                navigation={navigation}
                goTo="ViewTransaction"
              />
              <Calendar name="date" getDate={transformedDate} />
            </ScrollView>
          </Container>

          <ContainerKeyboard>
            <KeyboardAccessoryView
              renderScrollable={renderScrollable}
              style={{
                backgroundColor:
                  Platform.OS === 'ios' ? '#e7e6e6' : 'transparent',
              }}
            >
              <ViewButton>
                <FormButtonTransactions
                  disabled={buttonLoading}
                  title={buttonLoading ? 'Salvando...' : 'Editar'}
                />
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      )}
    </>
  );
}
