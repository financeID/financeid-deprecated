import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text as TextSvg, G} from 'react-native-svg';
import Colors from '../utils/colors';

export default function ProgressIncome({percentage}) {
  const isFinite = Number.isFinite(percentage) === false ? 0 : percentage;
  const fixNumber = isFinite * 100 < 0 ? 0 : isFinite;
  const roundPercentage = Math.round(fixNumber * 100) + '%';

  return (
    <ProgressCircle
      style={{height: 100, width: 90}}
      strokeWidth={3}
      progress={isFinite}
      progressColor={Colors.income}
    >
      <G>
        <TextSvg
          x="0"
          y="7"
          fill={Colors.income}
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
