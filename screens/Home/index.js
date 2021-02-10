import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text} from 'react-native';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import useStatusBar from '../../hooks/useStatusBar';
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

  const {uid} = auth.currentUser;

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

  useEffect(() => {
    const data = firebase.database().ref('users/' + uid + '/transactions');

    data
      //.orderByChild('type')
      //.equalTo('output')
      .on('value', (snapshot) => {
        setTransactions(snapshotToArray(snapshot));
      });
  }, []);

  return (
    <Container style={{paddingTop: getStatusBarHeight()}}>
      <Header>Controle de {'\n'}Janeiro</Header>

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
              <DownArrowIcon height={20} width={20} style={{paddingLeft: 35}} />
              <View>
                <DataText>Despesas</DataText>
                <DataSubText>{formatValue(balance.outcome)}</DataSubText>
              </View>
            </DataView>
          </View>
        </DataContainer>
      </ControlContainer>

      <Header>Para onde está indo {'\n'}seu dinheiro?</Header>

      <BoxContainer>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <BoxTag>
              <BoxTagText numberOfLines={1}>Receitas</BoxTagText>
              <BoxTagPriceText numberOfLines={1}>R$2.400,00</BoxTagPriceText>
              <StackedBarChart
                style={{height: 4}}
                keys={['incomes', 'outcomes']}
                colors={['#588A36', '#dddddd']}
                data={[
                  {month: new Date(2015, 0, 1), incomes: 3840, outcomes: 1920},
                ]}
                showGrid={false}
                horizontal={true}
              />
            </BoxTag>
          </View>
          <View>
            <BoxTag>
              <BoxTagText numberOfLines={1}>Automóvel</BoxTagText>
              <BoxTagPriceText numberOfLines={1}>R$1.230,20</BoxTagPriceText>
              <StackedBarChart
                style={{height: 4}}
                keys={['incomes', 'outcomes']}
                colors={['#588A36', '#dddddd']}
                data={[
                  {month: new Date(2015, 0, 1), incomes: 3840, outcomes: 10020},
                ]}
                showGrid={false}
                horizontal={true}
              />
            </BoxTag>
          </View>

          <View>
            <BoxTag>
              <BoxTagText numberOfLines={1}>Automóvel</BoxTagText>
              <BoxTagPriceText numberOfLines={1}>R$1.230,20</BoxTagPriceText>
              <StackedBarChart
                style={{height: 4}}
                keys={['incomes', 'outcomes']}
                colors={['#588A36', '#dddddd']}
                data={[
                  {month: new Date(2015, 0, 1), incomes: 8440, outcomes: 1920},
                ]}
                showGrid={false}
                horizontal={true}
              />
            </BoxTag>
          </View>
        </ScrollView>
      </BoxContainer>

      <Text>{Math.round((balance.total / balance.income) * 100)}%</Text>
      <Text>{Math.round((balance.outcome / balance.income) * 100)}%</Text>
      <Header>Despesas em aberto</Header>
      {transactions.map(({name, price, type}, key) => {
        return (
          <Text key={key}>
            {name} | R${price} | {type}
          </Text>
        );
      })}
    </Container>
  );
}
