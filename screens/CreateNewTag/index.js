import React, { useState } from 'react';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import * as Yup from 'yup';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import Modal from 'react-native-modal';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import FormButtonTransactions from '../../components/Forms/FormButtonTransactions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MyStatusBar from '../../hooks/statusBar';
import Colors from '../../utils/colors';
import {
  Content,
  ModalContainer,
  Title,
  ContainerKeyboard,
  ViewButton,
  Header,
  AddTag,
  Chamfered,
} from './styles';

const validationSchema = Yup.object().shape({
  description: Yup.string()
    .required('Digite um nome válido')
    .min(2, 'Deve conter ao menos 2 caracteres')
    .max(20, 'Deve conter no máximo 20 caracteres')
    .label('Description'),
});

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTransactions = values => {
    const { uid } = auth.currentUser;
    const { description } = values;
    const data = firebase.database().ref(`/users/${uid}/tags/`).push();

    data
      .set({
        name: description.trim().toLowerCase(),
        value: description.trim().toLowerCase(),
        icon: description.trim().toLowerCase(),
      })
      .then(() => {
        setModalVisible(!isModalVisible);
      });
  };

  const renderScrollable = GestureResponderHandlers => (
    <ScrollView
      keyboardDismissMode="interactive"
      {...GestureResponderHandlers}
    />
  );

  return (
    <>
      {isModalVisible === true ? (
        <MyStatusBar
          backgroundColor="rgba(0, 0, 0, 0.75)"
          barStyle="dark-content"
        />
      ) : (
        <MyStatusBar backgroundColor="#f9f9fd" barStyle="dark-content" />
      )}
      <AddTag onPress={toggleModal}>
        <MaterialCommunityIcons
          name="plus"
          size={Platform.OS === 'ios' ? 26 : 27}
          color={Colors.mediumGrey}
        />
      </AddTag>

      <Modal
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        swipeDirection="down"
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        style={ModalContainer}
      >
        <Form
          initialValues={{
            description: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => handleTransactions(values)}
        >
          <Content>
            <Chamfered />
            <Header>
              <Title>Adicionar nova tag</Title>

              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <MaterialCommunityIcons name="close" size={24} />
              </TouchableOpacity>
            </Header>

            <FormField
              name="description"
              leftIcon="tag-outline"
              autoCapitalize="none"
              autoFocus={true}
            />
          </Content>

          <ContainerKeyboard>
            <KeyboardAccessoryView
              renderScrollable={renderScrollable}
              style={{
                backgroundColor:
                  Platform.OS === 'ios' ? '#e7e6e6' : 'transparent',
              }}
            >
              <ViewButton>
                <FormButtonTransactions title={'Salvar'} />
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTester;
