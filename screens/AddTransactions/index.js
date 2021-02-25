import React, {useState} from 'react';
import {Platform, ScrollView} from 'react-native';
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
    .min(3, 'A descrição deve conter ao menos 3 caracteres')
    .label('Description'),
  value: Yup.number()
    .required('Digite o valor da transação')
    .positive()
    .label('Value'),
});

export default function AddTransactions({navigation}) {
  const {uid} = auth.currentUser;
  const [type, setType] = useState(0);

  const onType = type === 0 ? 'Salvar entrada' : 'Salvar saída';

  async function handleTransactions(values) {
    const {description, value, date, tag} = values;
    const data = firebase.database().ref(`/users/${uid}/transactions/`).push();

    data
      .set({
        description: description,
        value: Number(value),
        date: date,
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
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <SegmentedControl
            style={{marginTop: 25, marginBottom: 10}}
            values={['Entrada', 'Saída']}
            name="type"
            selectedIndex={type}
            onChange={(event) => {
              setType(event.nativeEvent.selectedSegmentIndex);
            }}
          />

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
          contentOffsetKeyboardOpened={35}
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
