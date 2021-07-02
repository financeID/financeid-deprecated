import React from 'react';
import { BarChart, YAxis } from 'react-native-svg-charts';
import { View, ScrollView } from 'react-native';
import * as scale from 'd3-scale';

export default function StackedBarChartExemple() {
  const data = [14, 12, 30, 40, 2];

  const width = data.length * 30;

  return (
    <ScrollView horizontal>
      <View
        style={{
          flexDirection: 'row',
          width: width,
          height: 70,
          marginTop: 20,
        }}
      >
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={index => index}
        />
        <BarChart
          style={{ flex: 1 }}
          data={data}
          spacingInner={0.8}
          gridMin={0}
          showGrid={true}
          svg={{ fill: '#bababa' }}
        />
      </View>
    </ScrollView>
  );
}
