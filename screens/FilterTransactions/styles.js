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

export const FilterContainer = styled.View`
  flex-direction: row;
`;

export const TypeFilter = styled.TouchableOpacity`
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 50px;
  background-color: ${props =>
    props.type === props.model ? '#808080' : '#e7e6e6'};
`;

export const TextFilter = styled.Text`
  color: ${props => (props.type === props.model ? '#ffffff' : '#000000')};
`;

export const SaveFilter = styled.TouchableOpacity`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 45px;
`;

export const SaveFilterText = styled.Text`
  color: #5c5b5c;
  font-size: 18px;
`;
