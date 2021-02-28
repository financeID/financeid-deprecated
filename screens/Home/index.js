import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import * as firebase from 'firebase';
import { auth } from '../../components/Firebase/firebase';
import useStatusBar from '../../hooks/useStatusBar';
import snapshotToArray from '../../utils/snapshotToArray';
import formatValue from '../../utils/formatValue';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StackedBarChart } from 'react-native-svg-charts';
import Colors from '../../utils/colors';
import ProgressIncome from '../../components/ProgressIncome';
import ProgressOutcome from '../../components/ProgressOutcome';
import FixedButton from '../../components/FixedButton';
import PickerMonth from '../../components/PickerMonth';

import {
  Container,
  HeaderContainer,
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

export default function HomeScreen({ navigation }) {
  useStatusBar('dark-content');

  const [transactions, setTransactions] = useState([]);
  const [date, setDate] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);

  const { uid } = auth.currentUser;

  useEffect(() => {
    setLoading(true);

    const data = firebase.database().ref(`/users/${uid}/transactions`);

    data.on('value', snapshot => {
      setTransactions(snapshotToArray(snapshot, date));
      setLoading(false);
    });
  }, [date, uid]);

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

  transactions.reduce((accumulator, { type, tag, price }) => {
    if (type === 'outcome') {
      if (!accumulator[tag]) {
        accumulator[tag] = { tag: tag, price: 0, type: type };
        tagGroup.push(accumulator[tag]);
      }

      accumulator[tag].price += Number(price);
    }

    return accumulator;
  }, {});

  return (
    <>
      {loading == false ? (
        <ScrollView>
          <Container style={{ paddingTop: getStatusBarHeight() }}>
            <HeaderContainer>
              <Header>
                Controle de {'\n'}
                {date === 1 ? 'Janeiro' : 'Fevereiro'}
              </Header>

              <PickerMonth date={date} setDate={setDate} />
            </HeaderContainer>

            <ControlContainer>
              <ProgressView>
                <ProgressIncome percentage={balance.total / balance.income} />
                <CircleContainerText>Receitas</CircleContainerText>
              </ProgressView>

              <ProgressView>
                <ProgressOutcome
                  percentage={balance.outcome / balance.income}
                />
                <CircleContainerText>Despesas</CircleContainerText>
              </ProgressView>

              <DataContainer>
                <View>
                  <DataView>
                    <BagIcon
                      height={20}
                      width={20}
                      style={{ paddingLeft: 35 }}
                    />
                    <View>
                      <DataText>Economias</DataText>
                      <DataSubText>{formatValue(balance.total)}</DataSubText>
                    </View>
                  </DataView>

                  <DataView>
                    <UpArrowIcon
                      height={20}
                      width={20}
                      style={{ paddingLeft: 35 }}
                    />
                    <View>
                      <DataText>Receitas</DataText>
                      <DataSubText>{formatValue(balance.income)}</DataSubText>
                    </View>
                  </DataView>

                  <DataView>
                    <DownArrowIcon
                      height={20}
                      width={20}
                      style={{ paddingLeft: 35 }}
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
            <ScrollView
              horizontal
              onContentSizeChange={0}
              showsHorizontalScrollIndicator={false}
            >
              {tagGroup.map(({ tag, price }, i) => {
                return (
                  <View key={price}>
                    <BoxTag
                      style={
                        i === tagGroup.length - 1 ? { marginRight: 23 } : {}
                      }
                    >
                      <BoxTagText numberOfLines={1}>{tag}</BoxTagText>
                      <BoxTagPriceText numberOfLines={1}>
                        {formatValue(price)}
                      </BoxTagPriceText>

                      <StackedBarChart
                        style={{ height: 4 }}
                        keys={['outcomes', 'incomes']}
                        colors={[Colors.outcome, '#dddddd']}
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
        </ScrollView>
      ) : (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Text>Carregando</Text>
        </View>
      )}

      <FixedButton navigation={navigation} />
    </>
  );
}
