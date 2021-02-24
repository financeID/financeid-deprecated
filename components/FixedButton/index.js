import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../utils/colors';
import {ContainerButton, Button} from './styles';

export default function AddButton({navigation}) {
  return (
    <ContainerButton>
      <Button onPress={() => navigation.navigate('addIncome')}>
        <Ionicons
          name="add-outline"
          style={{fontSize: 25, color: Colors.white}}
        />
      </Button>
    </ContainerButton>
  );
}
