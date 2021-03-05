import React from 'react';
import { StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Ionicons as Icon } from '@expo/vector-icons';
import Colors from '../../utils/colors';

export default function AddButton({ navigation }) {
  return (
    <ActionButton>
      <ActionButton.Item
        buttonColor={Colors.income}
        title="Adicionar entrada"
        onPress={() => navigation.navigate('addIncome', { Type: 0 })}
      >
        <Icon name="arrow-up" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={Colors.outcome}
        title="Adicionar saída"
        onPress={() => navigation.navigate('addIncome', { Type: 1 })}
      >
        <Icon name="arrow-down" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  );
}

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
