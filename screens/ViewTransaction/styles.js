import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Content = styled.View`
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 250px;
  padding: 14px;
`;

export const ModalContainer = {
  justifyContent: 'flex-end',
  margin: 0,
  backgroundColor: 'rgba(0, 0, 0, 0)',
};

export const Title = styled.Text`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  color: ${Colors.black};
`;

export const ContainerKeyboard = styled.View`
  background-color: ${Colors.white};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const AddTag = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

export const Chamfered = styled.View`
  width: 35px;
  height: 5px;
  background-color: #cfcfcf;
  border-radius: 50px;
  margin: 0 auto;
`;
