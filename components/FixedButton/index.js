import React from 'react';
import {View, Button} from 'react-native';
import {FixedButton} from './styles';

export default function AddButton() {
  return (
    <View style={{flex: 1}}>
      <FixedButton>
        <Button title="Press" color="#841584" accessibilityLabel="Press" />
      </FixedButton>
    </View>
  );
}
