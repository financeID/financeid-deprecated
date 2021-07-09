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

export const TransactionContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #dedede;
  padding: 10px 0 10px 0;
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

export const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
  padding-right: 3px;
`;
