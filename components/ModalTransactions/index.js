import React from 'react';
import {Modal, Button} from 'react-native';
import * as Yup from 'yup';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';

import {Container, Header, ContainerForm, ContainerButton} from './styles';

const validationSchema = Yup.object().shape({});
const {uid} = auth.currentUser;

export default function ModalTransactions({modalVisible, setModalVisible}) {
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

        <ContainerForm>
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
              leftIcon="pencil"
              autoCapitalize="words"
              placeholder="Descrição"
              autoFocus
            />
            <FormField
              name="value"
              leftIcon="cash"
              placeholder="Quanto foi?"
              autoCapitalize="none"
            />
            <FormField
              name="date"
              leftIcon="calendar"
              placeholder="Data"
              autoCapitalize="none"
            />
            <FormField
              name="tag"
              leftIcon="calendar"
              placeholder="Tag"
              autoCapitalize="none"
            />
            <FormField
              name="type"
              leftIcon="calendar"
              placeholder="Tipo"
              autoCapitalize="none"
            />
            <ContainerButton>
              <FormButton title={'Salvar'} />
            </ContainerButton>
            <Button
              title="fechar"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </Form>
        </ContainerForm>
      </Container>
    </Modal>
  );
}
