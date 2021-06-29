import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Scroll = styled.ScrollView`
  background-color: ${Colors.lightGrey};
`;

export const ListContainer = {
  backgroundColor: '#f9f9fd',
  padding: 0,
  paddingLeft: 15,
};

export const RemoveTag = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  justify-content: center;
  align-items: center;
`;

export const NothingHere = styled.Text`
  padding-top: 20px;
  font-size: 20px;
  text-align: center;
  color: ${Colors.mediumGrey};
`;
