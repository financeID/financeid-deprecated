import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  padding: 0 14px;
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

export const ValueInput = styled.TextInput`
  font-size: 40px;
  padding: 10px 10px;
`;
