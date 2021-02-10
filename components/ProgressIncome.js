import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text as TextSvg, G} from 'react-native-svg';

export default function ProgressIncome({percentage}) {
  const isFinite = Number.isFinite(percentage) === false ? 0 : percentage;
  const roundPercentage = Math.round(isFinite * 100) + '%';

  return (
    <ProgressCircle
      style={{height: 100, width: 90}}
      strokeWidth={3}
      progress={isFinite}
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
          {roundPercentage}
        </TextSvg>
      </G>
    </ProgressCircle>
  );
}
