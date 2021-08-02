import styled from 'styled-components/native';
import Colors from '../../utils/colors';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  padding: 0 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #f8f8ff;
`;

export const TransactionContainer = styled.View`
  padding: 22px 0 22px 0;
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

export const TransactionDetails = styled.View``;

export const TextDetail = styled.Text`
  padding-top: 10px;
  font-size: 2px;
  font-weight: 600;
`;
