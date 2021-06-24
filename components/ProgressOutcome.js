import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { Text as TextSvg, G } from 'react-native-svg';
import Colors from '../utils/colors';

export default function ProgressOutcome({ percentage }) {
  const isFinite = Number.isFinite(percentage) === false ? 0 : percentage;
  const fixNumber = isFinite * 100 > 100 ? 1 : isFinite;
  const roundPercentage = Math.round(fixNumber * 100) + '%';

  return (
    <ProgressCircle
      style={{ height: 100, width: 90 }}
      strokeWidth={3}
      progress={isFinite}
      progressColor={Colors.outcome}
    >
      <G>
        <TextSvg
          x="0"
          y="7"
          fill={Colors.outcome}
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
