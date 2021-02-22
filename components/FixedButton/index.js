import React from 'react';
import {StyleSheet} from 'react-native';
import ActionButton from 'react-native-action-button';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../utils/colors';

export default function AddButton({navigation, modalVisible, setModalVisible}) {
  const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: Colors.white,
    },
  });

  return (
    <ActionButton buttonColor={Colors.black}>
      <ActionButton.Item
        buttonColor={Colors.income}
        title="Adicionar receita"
        onPress={() => navigation.navigate('addIncome')}
      >
        <Ionicons name="arrow-up" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
}
