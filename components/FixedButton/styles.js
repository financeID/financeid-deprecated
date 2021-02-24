import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const ContainerButton = styled.View`
  border-radius: 50px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.black};
`;
