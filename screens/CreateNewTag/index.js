import React, { useState } from 'react';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import * as Yup from 'yup';
import 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import showToast from '../../utils/toastAndroid';
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
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTransactions = values => {
    setButtonLoading(true);

    const { uid } = auth.currentUser;
    const { description } = values;

    firebase
      .firestore()
      .collection('tags')
      .doc()
      .set({
        name: description.trim().toLowerCase(),
        icon: description.trim().toLowerCase(),
        color: description.trim().toLowerCase(),
        userReference: uid,
      })

      .then(() => {
        setModalVisible(!isModalVisible);

        setButtonLoading(false);

        Platform.OS === 'ios'
          ? showMessage({
              animationDuration: 500,
              message: 'Tag adicionada',
              backgroundColor: Colors.income,
              autoHide: true,
              position: 'bottom',
            })
          : showToast({
              message: 'Tag adicionada',
            });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
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
      <MyStatusBar backgroundColor="#f9f9fd" barStyle="dark-content" />

      <AddTag onPress={toggleModal}>
        <MaterialCommunityIcons
          name="plus"
          size={Platform.OS === 'ios' ? 26 : 27}
          color={Colors.primary}
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
                <FormButtonTransactions
                  disabled={buttonLoading}
                  title={buttonLoading ? 'Salvando...' : 'Salvar'}
                />
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTester;
