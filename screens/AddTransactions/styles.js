import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  flex: 1;
  padding: 0 14px;
  background-color: ${Colors.white};
`;

export const ContainerKeyboard = styled.View`
  background-color: ${Colors.white};
`;

export const ViewButton = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #e7e6e6;
  height: 45px;
`;

export const ButtonSave = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const ButtonText = styled.Text`
  color: #5c5b5c;
  font-size: 18px;
`;
