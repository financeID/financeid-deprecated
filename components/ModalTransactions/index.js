import React from 'react';
import {Text, TouchableOpacity, Modal} from 'react-native';

import {Container} from './styles';

export default function ModalTransactions({modalVisible, setModalVisible}) {
  return (
    <Modal
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent={true}
      visible={modalVisible}
    >
      <Container>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text>dkadsassdk</Text>
        </TouchableOpacity>
      </Container>
    </Modal>
  );
}
