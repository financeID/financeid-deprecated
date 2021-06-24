import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
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
  margin-top: 25px;
  color: ${Colors.primary};
  font-size: 23px;
  font-weight: bold;
`;

export const ControlContainer = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

export const ProgressView = styled.View`
  margin-right: 15px;
  align-items: center;
`;

export const CircleContainerText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.mediumGrey};
`;

export const DataContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const DataText = styled.Text`
  font-size: 16px;
  color: ${Colors.primary};
  font-weight: bold;
`;

export const DataSubText = styled.Text`
  ${Platform.select({
    ios: css`
      padding-bottom: 9px;
    `,
    android: css`
      padding-bottom: 3px;
    `,
  })};
  font-size: 12px;
  color: ${Colors.mediumGrey};
  font-weight: bold;
`;

export const DataView = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BoxContainer = styled.View`
  margin-top: 5px;
  height: 105px;
`;

export const BoxTag = styled.View`
  background-color: #f8f8ff;
  border-radius: 5px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
  elevation: 7;
  margin: 10px 0 0 23px;
  padding: 12px;
  width: 140px;
  height: 80px;
`;

export const BoxTagText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: ${Colors.primary};
`;

export const BoxTagPriceText = styled.Text`
  font-size: 14px;
  margin-bottom: 9px;
  font-weight: bold;
  color: ${Colors.mediumGrey};
`;

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
