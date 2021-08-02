import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
//import * as firebase from 'firebase';
//import { auth } from '../../components/Firebase/firebase';
import Modal from 'react-native-modal';
import { Feather, Ionicons } from '@expo/vector-icons';
import MyStatusBar from '../../hooks/statusBar';
//import Colors from '../../utils/colors';

import {
  Content,
  ModalContainer,
  Title,
  Header,
  AddTag,
  Chamfered,
} from './styles';

function FilterTransactions() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <MyStatusBar backgroundColor="#f9f9fd" barStyle="dark-content" />
      <AddTag onPress={toggleModal}>
        <Ionicons name="chevron-forward" size={24} color="#dedede" />
      </AddTag>

      <Modal
        scrollHorizontal
        propagateSwipe
        onBackButtonPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onSwipeComplete={() => setModalVisible(!isModalVisible)}
        swipeDirection="down"
        useNativeDriverForBackdrop
        isVisible={isModalVisible}
        style={ModalContainer}
      >
        <Content>
          <Chamfered />
          <Header>
            <Title>Listar</Title>

            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Feather name="x" size={24} />
            </TouchableOpacity>
          </Header>
        </Content>
      </Modal>
    </>
  );
}

export default FilterTransactions;
