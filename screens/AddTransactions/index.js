import React from 'react';
import {Platform, ScrollView} from 'react-native';
import {KeyboardAccessoryView} from '@flyerhq/react-native-keyboard-accessory-view';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
//import FormButton from '../../components/Forms/FormButton';

import {
  Container,
  ButtonSave,
  ButtonText,
  ContainerKeyboard,
  ViewButton,
} from './styles';

export default function AddTransactions({navigation}) {
  const validationSchema = Yup.object().shape({});
  const {uid} = auth.currentUser;

  async function handleTransactions(values) {
    const {description, value, date, tag, type} = values;
    const data = firebase.database().ref(`/users/${uid}/transactions/`).push();

    data
      .set({
        month: Number(date),
        name: description,
        price: Number(value),
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
    <>
      <Container>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Form
            initialValues={{
              description: '',
              value: '',
              date: '',
              tag: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleTransactions(values)}
          >
            <FormField
              name="description"
              autoCapitalize="words"
              placeholder="Descrição"
            />
            <FormField
              name="value"
              keyboardType={'numeric'}
              placeholder="Valor"
              autoCapitalize="none"
            />
            <FormField name="date" placeholder="Data" autoCapitalize="none" />
            <FormField name="tag" placeholder="Tag" autoCapitalize="none" />
            <FormField
              name="type"
              leftIcon="calendar"
              placeholder="Tipo"
              autoCapitalize="none"
            />

            {/*<FormButton title={'Salvar'} />*/}
          </Form>
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
            <ButtonSave>
              <ButtonText>Salvar</ButtonText>
            </ButtonSave>
          </ViewButton>
        </KeyboardAccessoryView>
      </ContainerKeyboard>
    </>
  );
}
