import React from 'react';
import {Modal, Button} from 'react-native';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';

import {Container, Header} from './styles';

export default function ModalTransactions({modalVisible, setModalVisible}) {
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
      .then(() => setModalVisible(!modalVisible));
  }

  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
      visible={modalVisible}
    >
      <Container>
        <Header>Cadastrar receita</Header>

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
            descTitle="Descrição"
            name="description"
            autoCapitalize="words"
            placeholder="Descrição"
            autoFocus
          />
          <FormField
            descTitle="Valor"
            name="value"
            placeholder="Quanto foi?"
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

          <FormButton title={'Salvar'} />

          <Button
            title="fechar"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </Form>
      </Container>
    </Modal>
  );
}
