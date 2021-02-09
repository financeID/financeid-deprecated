import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text as TextSvg, G} from 'react-native-svg';

export default function ProgressIncome({percent}) {
  const por = Math.round(percent * 100);
  return (
    <ProgressCircle
      style={{height: 100, width: 90}}
      strokeWidth={3}
      progress={percent}
      progressColor={'#588A36'}
    >
      <G>
        <TextSvg
          x="0"
          y="7"
          fill="#588A36"
          textAnchor="middle"
          fontSize={20}
          fontWeight="bold"
        >
          {por}
        </TextSvg>
      </G>
    </ProgressCircle>
  );
}
