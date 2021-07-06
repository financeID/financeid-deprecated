import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import useStatusBar from '../../hooks/useStatusBar';
import { Ionicons } from '@expo/vector-icons';

import {
  Container,
  HeaderContainer,
  Header,
  TransactionContainer,
  TransactionInfo,
  TransactionText,
  TransactionDate,
  TransactionTag,
  InfoView,
  TransactionPrice,
  RightContent,
} from './styles';

export default function ConfigScreen() {
  useStatusBar('dark-content');
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <Container>
            <HeaderContainer>
              <Header>
                Controle de {'\n'}
                fevereiro
              </Header>
            </HeaderContainer>

            <TransactionContainer>
              <TransactionInfo>
                <TransactionText>Compras do mês</TransactionText>
                <InfoView>
                  <TransactionDate>14/10/2021 - </TransactionDate>
                  <TransactionTag>Lazer</TransactionTag>
                </InfoView>
              </TransactionInfo>
              <RightContent>
                <TransactionPrice>+ 100</TransactionPrice>
                <Ionicons name="chevron-forward" size={24} color="#dedede" />
              </RightContent>
            </TransactionContainer>
          </Container>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
