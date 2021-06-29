import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Content = styled.View`
  background-color: #fff;
  border-radius: 4px;
  height: 220px;
  padding: 14px;
`;

export const ModalContainer = {
  justifyContent: 'flex-end',
  margin: 0,
};

export const Title = styled.Text`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 22px;
  color: ${Colors.black};
`;

export const ContainerKeyboard = styled.View`
  background-color: ${Colors.white};
`;

export const ViewButton = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #e7e6e6;
  height: 45px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddTag = styled.TouchableOpacity`
  padding: 5px;
`;
