import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #f8f8ff;
`;

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: #ffffff;
`;

export const Container = styled.View`
  margin: 0 20px;
`;

export const Header = styled.Text`
  color: ${Colors.primary};
  font-size: 23px;
  font-weight: bold;
`;

export const HeaderContainer = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: ${Platform.OS === 'ios' ? '20px' : '40px'};
`;

export const TransactionScrollView = styled.ScrollView`
  flex: 1;
  background-color: #f8f8ff;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 0 20px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  elevation: 10;
`;

export const TransactionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  padding: 12px 0 12px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const TransactionInfo = styled.View`
  flex-direction: column;
  padding: 1px;
`;

export const TransactionText = styled.Text`
  font-size: 17px;
  padding-bottom: 5px;
`;

export const InfoView = styled.View`
  flex-direction: row;
`;
export const TransactionDate = styled.Text`
  font-size: 12px;
  color: #7c8998;
`;

export const TransactionTag = styled.Text`
  font-size: 12.5px;
  color: #7c8998;
`;

export const TransactionPrice = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${props => (props.type === 'income' ? Colors.income : Colors.outcome)};
  padding-right: 10px;
`;

export const RightContentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 5px;
`;

export const NoTransactions = styled.View`
  justify-content: center;
  margin: 0 30px 70px;
`;

export const ArrowIcon = styled.View`
  flex-direction: row;
  margin: 10px 0px;
`;

export const NoTransactionsText = styled.Text`
  color: ${Colors.mediumGrey};
  padding: 5px 10px;
  font-size: 23px;
  font-weight: 600;
`;
