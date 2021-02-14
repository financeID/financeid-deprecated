import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as firebase from 'firebase';
import {auth} from '../../components/Firebase/firebase';
import useStatusBar from '../../hooks/useStatusBar';
import RNPickerSelect from 'react-native-picker-select';
import snapshotToArray from '../../utils/snapshotToArray';
import formatValue from '../../utils/formatValue';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StackedBarChart} from 'react-native-svg-charts';
import {Ionicons} from '@expo/vector-icons';
import ProgressIncome from '../../components/ProgressIncome';
import ProgressOutcome from '../../components/ProgressOutcome';
import ActionButton from 'react-native-action-button';

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
  Picker,
} from './styles';

import BagIcon from '../../assets/bag.svg';
import UpArrowIcon from '../../assets/up-arrow.svg';
import DownArrowIcon from '../../assets/down-arrow.svg';

export default function HomeScreen() {
  useStatusBar('dark-content');

  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const {uid} = auth.currentUser;

  useEffect(() => {
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

  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      color: 'transparent',
      width: 60,
      height: 50,
    },
    inputAndroid: {
      color: 'transparent',
      width: 60,
      height: 50,
    },
  });

  const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });

  return (
    <>
      <ScrollView>
        <Container style={{paddingTop: getStatusBarHeight()}}>
          <HeaderContainer>
            <Header>
              Controle de {'\n'}
              {month === 1 ? 'Janeiro' : 'Fevereiro'}
            </Header>

            <Picker>
              <RNPickerSelect
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    width: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    margin: 0,
                  },
                  placeholder: {
                    fontSize: 0,
                  },
                }}
                value={month}
                placeholder={{}}
                useNativeAndroidPickerStyle={false}
                onValueChange={(value) => setMonth(value)}
                InputAccessoryView={() => null}
                items={[
                  {label: 'Janeiro', value: 1},
                  {label: 'Fevereiro', value: 2},
                  {label: 'Março', value: 3},
                  {label: 'Java', value: 'Java'},
                  {label: 'C++', value: 'C++'},
                  {label: 'C', value: 'C'},
                ]}
                Icon={() => {
                  return <Ionicons name="filter" size={24} color="black" />;
                }}
              />
            </Picker>
          </HeaderContainer>

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
                  <UpArrowIcon
                    height={20}
                    width={20}
                    style={{paddingLeft: 35}}
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
            {tagGroup.map(({tag, price}, i) => {
              return (
                <View key={price}>
                  <BoxTag
                    style={i === tagGroup.length - 1 ? {marginRight: 23} : {}}
                  >
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
      </ScrollView>
      <ActionButton buttonColor="#000000">
        <ActionButton.Item
          buttonColor="#588A36"
          title="Adicionar receita"
          onPress={() => {}}
        >
          <Ionicons name="arrow-up" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#BB3E5D"
          title="Adicionar gasto"
          onPress={() => {}}
        >
          <Ionicons name="arrow-down" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </>
  );
}
