import React from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Ionicons} from '@expo/vector-icons';

export default function AddButton({modalVisible, setModalVisible}) {
  const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

  return (
    <ActionButton buttonColor="#000000">
      <ActionButton.Item
        buttonColor="#588A36"
        title="Adicionar receita"
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Ionicons name="arrow-up" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
}
