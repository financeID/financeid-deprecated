import React, {useState} from 'react';
import {Platform, ScrollView} from 'react-native';
//import {parse, isDate, format} from 'date-fns';
import {KeyboardAccessoryView} from '@flyerhq/react-native-keyboard-accessory-view';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';

import {Container, ContainerKeyboard, ViewButton} from './styles';

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Digite uma descrição para o item')
    .min(2, 'A descrição deve conter ao menos 3 caracteres')
    .max(20, 'A descrição deve conter no máximo 20 caracteres')
    .label('Description'),
  value: Yup.number()
    .typeError('O valor deve ser um número')
    .required('Digite o valor da transação')
    .positive()
    .label('Value'),
  date: Yup.string()
    .typeError('Insira uma data')
    .required('A data é obrigatória')
    .label('Date'),
  tag: Yup.string()
    .required('Digite uma tag para o item')
    .min(2, 'A tag deve conter ao menos 3 caracteres')
    .max(10, 'A tag deve conter no máximo 10 caracteres')
    .label('Tag'),
});

export default function AddTransactions({navigation}) {
  const {uid} = auth.currentUser;
  const [type, setType] = useState(0);

  const onType = type === 0 ? 'Adicionar entrada' : 'Adicionar saída';

  async function handleTransactions(values) {
    const {description, value, date, tag} = values;
    const data = firebase.database().ref(`/users/${uid}/transactions/`).push();

    const valueTransformed = Math.round(value * 100) / 100;

    data
      .set({
        description: description.trim(),
        value: valueTransformed,
        date: Number(date),
        tag: tag,
        type: type,
      })
      .then(() => navigation.goBack());
  }

  const renderScrollable = (GestureResponderHandlers) => (
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
      onSubmit={(values) => handleTransactions(values)}
    >
      <Container>
        <SegmentedControl
          style={{marginTop: 15, marginBottom: 10}}
          values={['Entrada', 'Saída']}
          name="type"
          selectedIndex={type}
          onChange={(event) => {
            setType(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <FormField
            name="description"
            leftIcon="text-short"
            autoCapitalize="words"
            placeholder="Descrição"
          />
          <FormField
            name="value"
            leftIcon="currency-usd"
            keyboardType={'numeric'}
            placeholder="Valor"
            autoCapitalize="none"
          />
          <FormField
            name="date"
            leftIcon="calendar-blank-outline"
            rightIcon="calendar-blank-outline"
            placeholder="Data"
            autoCapitalize="none"
          />
          <FormField
            name="tag"
            leftIcon="tag-outline"
            placeholder="Tag"
            autoCapitalize="none"
          />
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
            <FormButtonTransactions title={onType} />
          </ViewButton>
        </KeyboardAccessoryView>
      </ContainerKeyboard>
    </Form>
  );
}
