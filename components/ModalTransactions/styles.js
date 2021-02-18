import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Container = styled.View`
  background-color: ${Colors.white};
  flex: 1;
  padding: 0 20px 40px;
  justify-content: space-between;
`;

export const Header = styled.Text`
  margin-top: 80px;
  text-align: center;
  margin-bottom: 50px;
  color: ${Colors.primary};
  font-size: 30px;
  font-weight: bold;
`;

export const ContainerForm = styled.View``;

export const ContainerButton = styled.View`
  flex-direction: row;
`;
