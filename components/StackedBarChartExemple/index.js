import React from 'react';
import { BarChart, XAxis } from 'react-native-svg-charts';
import { View, ScrollView } from 'react-native';

export default function StackedBarChartExemple() {
  const data = [
    {
      value: 400,
      label: 'Categoria',
    },
    {
      value: 190,
      label: 'Lazer',
    },
    {
      value: 300,
      label: 'Escola',
    },
    {
      value: 200,
      label: 'Educação',
    },
  ];

  const width = data.length * 50;

  return (
    <ScrollView horizontal>
      <View
        style={{
          width: width,
          height: 140,
          marginTop: 5,
          marginLeft: 22,
        }}
      >
        <BarChart
          style={{ flex: 1 }}
          data={data}
          spacingInner={0.85}
          yAccessor={({ item }) => item.value}
          gridMin={0}
          contentInset={{ top: 10, bottom: 0 }}
          svg={{ fill: '#bababa' }}
          onPress={() => console.log('askd')}
        />
        <XAxis
          style={{ marginHorizontal: -15, height: 70 }}
          data={data}
          contentInset={{ left: 24, right: 24 }}
          svg={{
            fontSize: 8,
            fill: 'black',
            rotation: 90,
            originY: 7,
            y: 4,
            textAnchor: 'start',
          }}
          formatLabel={(_, index) => data[index].label}
          yAccessor={({ index }) => index}
        />
      </View>
    </ScrollView>
  );
}
