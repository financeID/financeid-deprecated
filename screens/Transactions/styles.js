import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  margin: 0 20px;
`;

export const Header = styled.Text`
  margin-top: 20px;
  color: ${Colors.primary};
  font-size: 23px;
  font-weight: bold;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'ios' ? '0px' : '20px'};
  margin-bottom: 15px;
`;

export const TransactionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  padding: 15px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TransactionInfo = styled.View`
  flex-direction: column;
`;

export const TransactionText = styled.Text`
  font-size: 17px;
  padding-bottom: 5px;
`;

export const InfoView = styled.View`
  flex-direction: row;
`;
export const TransactionDate = styled.Text`
  font-size: 13px;
  color: #7c8998;
`;

export const TransactionTag = styled.Text`
  font-size: 13px;
  color: #7c8998;
`;

export const TransactionPrice = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #4ab648;
  padding-right: 15px;
`;

export const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 5px;
`;
