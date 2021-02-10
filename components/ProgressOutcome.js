import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {Text as TextSvg, G} from 'react-native-svg';

export default function ProgressOutcome({percentage}) {
  const isFinite = Number.isFinite(percentage) === false ? 0 : percentage;
  const roundPercentage = Math.round(isFinite * 100) + '%';

  return (
    <ProgressCircle
      style={{height: 100, width: 90}}
      strokeWidth={3}
      progress={isFinite}
      progressColor={'#BB3E5D'}
    >
      <G>
        <TextSvg
          x="0"
          y="7"
          fill="#BB3E5D"
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
