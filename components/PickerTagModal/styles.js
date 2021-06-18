import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const ViewContent = styled.View`
  background-color: #d0d4da;
  height: 60%;
  padding-top: 0;
`;

export const modal = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export const TagContainer = styled.ScrollView``;

export const TagText = styled.Text`
  padding: 10px;
  font-size: 18px;
  text-align: center;
`;
