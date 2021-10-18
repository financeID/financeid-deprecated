import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import showToast from '../../utils/toastAndroid';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { auth } from '../../components/Firebase/firebase';
import Colors from '../../utils/colors';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';
import TagPicker from '../../components/TagPicker';
import Calendar from '../../components/Calendar';
import StatusSwitch from '../../components/StatusSwitch';
import { formatedDatePtBR } from '../../utils/formatedDate';

import { Container, ContainerKeyboard, ViewButton } from './styles';

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

export default function AddTransactions({ navigation, route }) {
  const { uid } = auth.currentUser;
  const { Type } = route.params;

  const [buttonLoading, setButtonLoading] = useState(false);
  const [type, setType] = useState(Type);

  const { Tag } = route.params;

  const onType = type === 0 ? 'Adicionar entrada' : 'Adicionar saída';

  const handleTransactions = values => {
    setButtonLoading(true);

    const { description, value, date, tag, status } = values;

    const dateTranformed = formatedDatePtBR(date);

    const valueTransformed = value.replace(/,/g, '');
    const typeTransformed = type === 0 ? 'income' : 'outcome';

    firebase
      .firestore()
      .collection('transactions')
      .doc()
      .set({
        userReference: uid,
        status: status,
        description: description.trim(),
        price: valueTransformed,
        date: dateTranformed,
        createdAt: new Date(),
        tag: tag,
        type: typeTransformed.trim(),
      })
      .then(() => {
        navigation.navigate('Home');

        setButtonLoading(false);

        const typeMsg =
          type === 0
            ? 'Entrada adicionada com sucesso'
            : 'Despesa adicionada com sucesso';

        Platform.OS === 'ios'
          ? showMessage({
              animationDuration: 500,
              message: typeMsg,
              backgroundColor: Colors.income,
              autoHide: true,
              position: 'top',
            })
          : showToast({
              message: typeMsg,
            });
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  const renderScrollable = GestureResponderHandlers => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...GestureResponderHandlers}
    />
  );

  return (
    <Form
      initialValues={{
        description: '',
        value: '',
        date: '',
        tag: '',
        type: '',
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
          <StatusSwitch name="status" />
          <FormField
            placeholder="Descrição"
            name="description"
            autoCapitalize="sentences"
            autoFocus={true}
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
            tag={Tag}
            name="tag"
            navigation={navigation}
            goTo="AddIncome"
          />
          <Calendar name="date" />
        </ScrollView>
      </Container>

      <ContainerKeyboard>
        <KeyboardAccessoryView
          renderScrollable={renderScrollable}
          style={{
            backgroundColor: Platform.OS === 'ios' ? '#e7e6e6' : 'transparent',
          }}
        >
          <ViewButton>
            <FormButtonTransactions
              title={buttonLoading ? 'Salvando...' : onType}
              disabled={buttonLoading}
            />
          </ViewButton>
        </KeyboardAccessoryView>
      </ContainerKeyboard>
    </Form>
  );
}
