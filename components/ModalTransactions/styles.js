import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Header = styled.Text`
  margin-top: 80px;
  text-align: center;
  margin-bottom: 50px;
  color: ${Colors.primary};
  font-size: 30px;
  font-weight: bold;
`;
