import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Scroll = styled.ScrollView`
  background-color: ${Colors.lightGrey};
`;

export const ListContainer = styled.TouchableOpacity`
  padding: 0;
  padding-left: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BorderBottom = styled.View`
  background-color: #e0e0e0;
  height: 1px;
`;

export const ListTitleContainer = styled.View``;

export const ListTitle = styled.Text``;

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

export const SearchBar = styled.TextInput`
  margin: 20px 10px 10px;
  padding: 10px;
  border-radius: 8px;
  color: #2b2b2b;
  font-size: 18px;
  text-align: left;
  background-color: #e1e4e8;
`;
