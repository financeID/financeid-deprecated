import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import useStatusBar from '../../hooks/useStatusBar';
import RNPickerSelect from 'react-native-picker-select';
import snapshotToArray from '../../utils/snapshotToArray';
import formatValue from '../../utils/formatValue';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StackedBarChart} from 'react-native-svg-charts';

import ProgressIncome from '../../components/ProgressIncome';
import ProgressOutcome from '../../components/ProgressOutcome';

import {
  Container,
  Header,
  ControlContainer,
  ProgressView,
  CircleContainerText,
  DataContainer,
  DataText,
  DataSubText,
  DataView,
  BoxContainer,
  BoxTag,
  BoxTagText,
  BoxTagPriceText,
} from './styles';

import BagIcon from '../../assets/bag.svg';
import UpArrowIcon from '../../assets/up-arrow.svg';
import DownArrowIcon from '../../assets/down-arrow.svg';

export default function HomeScreen() {
  useStatusBar('dark-content');

  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(2);

  const {uid} = auth.currentUser;

  useEffect(() => {
    console.log(month);
    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data
      .orderByChild('month')
      .equalTo(month)
      .on('value', (snapshot) => {
        setTransactions(snapshotToArray(snapshot));
      });
  }, [month]);

  const balance = transactions.reduce(
    (accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += Number(transaction.price);
          accumulator.total += Number(transaction.price);
          break;
        case 'outcome':
          accumulator.outcome += Number(transaction.price);
          accumulator.total -= Number(transaction.price);
          break;
        default:
          break;
      }

      return accumulator;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  const tagGroup = [];

  transactions.reduce((accumulator, {type, tag, price}) => {
    if (type === 'outcome') {
      if (!accumulator[tag]) {
        accumulator[tag] = {tag: tag, price: 0, type: type};
        tagGroup.push(accumulator[tag]);
      }

      accumulator[tag].price += Number(price);
    }

    return accumulator;
  }, {});

  return (
    <ScrollView>
      <Container style={{paddingTop: getStatusBarHeight()}}>
        <Header>Controle de {'\n'}Janeiro</Header>

        <RNPickerSelect
          onValueChange={(value) => setMonth(value)}
          items={[
            {label: 'Janeiro', value: 1},
            {label: 'Fevereiro', value: 2},
            {label: 'Março', value: 3},
            {label: 'Java', value: 'Java'},
            {label: 'C++', value: 'C++'},
            {label: 'C', value: 'C'},
          ]}
        />

        <ControlContainer>
          <ProgressView>
            <ProgressIncome percentage={balance.total / balance.income} />
            <CircleContainerText>Receitas</CircleContainerText>
          </ProgressView>

          <ProgressView>
            <ProgressOutcome percentage={balance.outcome / balance.income} />
            <CircleContainerText>Despesas</CircleContainerText>
          </ProgressView>

          <DataContainer>
            <View>
              <DataView>
                <BagIcon height={20} width={20} style={{paddingLeft: 35}} />
                <View>
                  <DataText>Economias</DataText>
                  <DataSubText>{formatValue(balance.total)}</DataSubText>
                </View>
              </DataView>

              <DataView>
                <UpArrowIcon height={20} width={20} style={{paddingLeft: 35}} />
                <View>
                  <DataText>Receitas</DataText>
                  <DataSubText>{formatValue(balance.income)}</DataSubText>
                </View>
              </DataView>

              <DataView>
                <DownArrowIcon
                  height={20}
                  width={20}
                  style={{paddingLeft: 35}}
                />
                <View>
                  <DataText>Despesas</DataText>
                  <DataSubText>{formatValue(balance.outcome)}</DataSubText>
                </View>
              </DataView>
            </View>
          </DataContainer>
        </ControlContainer>

        <Header>Para onde está indo {'\n'}seu dinheiro esse mês?</Header>
      </Container>

      <BoxContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tagGroup.map(({tag, price}) => {
            return (
              <View key={price}>
                <BoxTag>
                  <BoxTagText numberOfLines={1}>{tag}</BoxTagText>
                  <BoxTagPriceText numberOfLines={1}>
                    {formatValue(price)}
                  </BoxTagPriceText>
                  <StackedBarChart
                    style={{height: 4}}
                    keys={['outcomes', 'incomes']}
                    colors={['#588A36', '#dddddd']}
                    data={[
                      {
                        incomes: balance.income,
                        outcomes: price,
                      },
                    ]}
                    showGrid={false}
                    horizontal={true}
                  />
                </BoxTag>
              </View>
            );
          })}
        </ScrollView>
      </BoxContainer>

      <Container>
        <Header>Despesas em aberto</Header>
        {transactions.map(({name, price, type, month}, key) => {
          return (
            <Text key={key}>
              {name} | R${price} | {type} | {month}
            </Text>
          );
        })}

        <Text>_____________</Text>
      </Container>
    </ScrollView>
  );
}
