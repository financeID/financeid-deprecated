import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const Content = styled.View`
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 220px;
  padding: 14px;
`;

export const ModalContainer = {
  justifyContent: 'flex-end',
  margin: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.15)',
};

export const Title = styled.Text`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
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

export const Chamfered = styled.View`
  width: 35px;
  height: 5px;
  background-color: #cfcfcf;
  border-radius: 50px;
  margin: 0 auto;
`;
