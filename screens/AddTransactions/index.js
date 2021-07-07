import React, { useState } from 'react';
import { Platform, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import Colors from '../../utils/colors';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';
import TagPicker from '../../components/TagPicker';
import Calendar from '../../components/Calendar';
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
    .required('A data é1 obrigatória')
    .label('Date'),
  tag: Yup.string()
    .required('Selecione uma tag')
    .min(2, 'A tag deve conter ao menos 3 caracteres')
    .max(10, 'A tag deve conter no máximo 10 caracteres')
    .nullable()
    .label('Tag'),
});

export default function AddTransactions({ navigation, route }) {
  const { uid } = auth.currentUser;
  const { Type } = route.params;

  const [type, setType] = useState(Type);

  const { Tag } = route.params;

  const onType = type === 0 ? 'Adicionar entrada' : 'Adicionar saída';

  const handleTransactions = values => {
    const { description, value, date, tag } = values;

    const dateTranformed = formatedDatePtBR(date);

    const data = firebase.database().ref(`/users/${uid}/transactions/`).push();

    const valueTransformed = value.replace(/,/g, '');
    const typeTransformed = type === 0 ? 'income' : 'outcome';
    const createdAt = new Date().toISOString();

    data
      .set({
        created_at: createdAt,
        description: description.trim(),
        price: valueTransformed,
        date: dateTranformed,
        tag: tag,
        type: typeTransformed.trim(),
      })
      .then(() => {
        navigation.navigate('Home');

        const typeMsg =
          type === 0
            ? 'Entrada adicionada com sucesso'
            : 'Despesa adicionada com sucesso';

        showMessage({
          animationDuration: 500,
          message: typeMsg,
          backgroundColor: Colors.income,
        });
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
            <FormButtonTransactions title={onType} />
          </ViewButton>
        </KeyboardAccessoryView>
      </ContainerKeyboard>
    </Form>
  );
}
