import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
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
              <Title>Filtro</Title>

              <TouchableOpacity
                onPress={() => setModalVisible(!isModalVisible)}
              >
                <Feather name="x" size={24} />
              </TouchableOpacity>
            </Header>

            <FilterContainer>
              <TypeFilter
                onPress={() => setType(null)}
                style={
                  type === null
                    ? { backgroundColor: '#808080' }
                    : { backgroundColor: '#e7e6e6' }
                }
              >
                <Text
                  style={
                    type === null ? { color: '#ffffff' } : { color: '#000000' }
                  }
                >
                  Todos
                </Text>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('income')}
                style={
                  type === 'income'
                    ? { backgroundColor: '#808080' }
                    : { backgroundColor: '#e7e6e6' }
                }
              >
                <Text
                  style={
                    type === 'income'
                      ? { color: '#ffffff' }
                      : { color: '#000000' }
                  }
                >
                  Entradas
                </Text>
              </TypeFilter>

              <TypeFilter
                onPress={() => setType('outcome')}
                style={
                  type === 'outcome'
                    ? { backgroundColor: '#808080' }
                    : { backgroundColor: '#e7e6e6' }
                }
              >
                <Text
                  style={
                    type === 'outcome'
                      ? { color: '#ffffff' }
                      : { color: '#000000' }
                  }
                >
                  Saídas
                </Text>
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
                <TypeFilter
                  onPress={() => handleFilter()}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Salvar</Text>
                </TypeFilter>
              </ViewButton>
            </KeyboardAccessoryView>
          </ContainerKeyboard>
        </Form>
      </Modal>
    </>
  );
}

export default ModalTester;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },
  buttonText: {
    color: '#5c5b5c',
    fontSize: 18,
  },
});
