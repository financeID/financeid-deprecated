import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: 0 20px;
`;

export const Header = styled.Text`
margin-top: 25px;
color: #404040;
  font-size: 23px;
  font-weight: bold;
`;

export const ControlContainer = styled.View`
    flex-direction: row;
    margin-top: 15px;
`

export const ProgressView = styled.View`
    margin-right: 15px;
    align-items: center;
`;


export const CircleContainerText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #979797;
`;

export const DataContainer = styled.View`
    flex: 1;
    align-items: flex-end;
`;

export const DataText = styled.Text`
  font-size: 16px;
  color: #404040;
  font-weight: bold;
`;

export const DataSubText = styled.Text`
    ${Platform.select({ ios: css`padding-bottom: 9px`, android: css`padding-bottom: 3px` })};
    font-size: 12px;
    color: #979797;
    font-weight: bold;
`;

export const DataView = styled.View`
  flex-direction: row;
  align-items: center;
`;