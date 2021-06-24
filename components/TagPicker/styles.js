import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  flex: 1;
`;

export const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

export const Input = styled.Text`
  padding-top: 15px;
  padding-left: 7px;
  flex: 1;
  font-size: ${Platform.OS === 'ios' ? '19px' : '16px'};
  line-height: 26px;
  color: ${Colors.black};
`;

export const Icon = styled.View`
  padding-top: 20px;
  padding-left: 15px;
  padding-bottom: 15px;
  padding-right: 15px;
`;

export const PlaceHolder = styled.Text`
  color: ${Colors.mediumGrey};
`;
