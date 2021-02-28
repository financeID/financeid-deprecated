import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../utils/colors';
import {ContainerButton, Button} from './styles';

export default function AddButton({navigation, add}) {
  return (
    <ContainerButton>
      <Button onPress={() => navigation.navigate('addIncome', {add: add})}>
        <Ionicons
          name="add-outline"
          style={{fontSize: 25, color: Colors.white}}
        />
      </Button>
    </ContainerButton>
  );
}
