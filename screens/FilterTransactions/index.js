import React, { useState } from 'react';
import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import Form from '../../components/Forms/Form';
import Modal from 'react-native-modal';
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import { Feather } from '@expo/vector-icons';
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
  FilterContainer,
  TypeFilter,
  TextFilter,
  SaveFilter,
  SaveFilterText,
} from './styles';

function ModalTester({ setFilter }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [type, setType] = useState(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleFilter = () => {
    setFilter(type);

    setModalVisible(!isModalVisible);
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
        <Feather
          name="sliders"
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
        <Form onSubmit={() => handleFilter()}>
          <Content>
            <Chamfered />
            <Header>
              <Title>Listar</Title>

              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <Feather name="x" size={24} />
              </TouchableOpacity>
            </Header>

            <FilterContainer>
              <TypeFilter
                onPress={() => setType(null)}
                type={type}
                model={null}
              >
                <TextFilter type={type} model={null}>
                  Todos
                </TextFilter>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('income')}
                type={type}
                model={'income'}
              >
                <TextFilter type={type} model={'income'}>
                  Entradas
                </TextFilter>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('outcome')}
                type={type}
                model={'outcome'}
              >
                <TextFilter type={type} model={'outcome'}>
                  Saídas
                </TextFilter>
              </TypeFilter>
            </FilterContainer>
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
                <SaveFilter onPress={() => handleFilter()}>
                  <SaveFilterText>Salvar</SaveFilterText>
                </SaveFilter>
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTester;
