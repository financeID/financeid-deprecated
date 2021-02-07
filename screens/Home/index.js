import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import useStatusBar from '../../hooks/useStatusBar';
import { auth, logout } from '../../components/Firebase/firebase';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { ProgressCircle, StackedBarChart } from 'react-native-svg-charts';

import { Text as TextSvg, G } from 'react-native-svg';

import { Container, Header, ControlContainer, ProgressView, CircleContainerText, DataContainer, DataText, DataSubText, DataView, BoxContainer, BoxTag, BoxTagText, BoxTagPriceText } from './styles';

import BagIcon from "../../assets/bag.svg";
import UpArrowIcon from "../../assets/up-arrow.svg";
import DownArrowIcon from "../../assets/down-arrow.svg";

export default function HomeScreen() {
    useStatusBar('dark-content');

    /*;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const { uid } = auth.currentUser;

    useEffect(() => {
        const data = firebase.database().ref('users/' + uid);

        data.once('value', (snapshot) => {
            const { firstName, email } = snapshot.val();

            setName(firstName);
            setEmail(email);
        });
    }, []);*/

    const TextProgressIncome = () => (
        <G>
            <TextSvg x="0" y="7" fill="#588A36" textAnchor="middle" fontSize={20} fontWeight="bold">
                80%
            </TextSvg>
        </G>
    );

    const TextProgressExpenses = () => (
        <G>
            <TextSvg x="0" y="7" fill="#BB3E5D" textAnchor="middle" fontSize={20} fontWeight="bold">
                50%
            </TextSvg>
        </G>
    );

    async function handleSignOut() {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        /*<Container>
            <Button title="Sign Out" onPress={handleSignOut} />
            <Header>UID: {uid}</Header>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
        </Container>*/

        <Container style={{ paddingTop: getStatusBarHeight() }}>
            <Header>Controle de {"\n"}Janeiro</Header>

            <ControlContainer>
                <ProgressView>
                    <ProgressCircle style={{ height: 100, width: 90 }} strokeWidth={3} progress={0.8} progressColor={'#588A36'}>
                        <TextProgressIncome />
                    </ProgressCircle>

                    <CircleContainerText>
                        Receitas
                    </CircleContainerText>
                </ProgressView>

                <ProgressView>
                    <ProgressCircle style={{ height: 100, width: 90 }} strokeWidth={3} progress={0.5} progressColor={'#BB3E5D'}>
                        <TextProgressExpenses />
                    </ProgressCircle>

                    <CircleContainerText>
                        Despesas
                    </CircleContainerText>
                </ProgressView>

                <DataContainer>
                    <View>
                        <DataView>
                            <BagIcon height={20} width={20} style={{ paddingLeft: 35 }} />
                            <View>
                                <DataText>Economias</DataText>
                                <DataSubText>R$2.500,20</DataSubText>
                            </View>
                        </DataView>

                        <DataView>
                            <UpArrowIcon height={20} width={20} style={{ paddingLeft: 35 }} />
                            <View>
                                <DataText>Receitas</DataText>
                                <DataSubText>R$5.150,20</DataSubText>
                            </View>
                        </DataView>

                        <DataView>
                            <DownArrowIcon height={20} width={20} style={{ paddingLeft: 35 }} />
                            <View>
                                <DataText>Despesas</DataText>
                                <DataSubText>R$2.650,20</DataSubText>
                            </View>
                        </DataView>
                    </View>
                </DataContainer>
            </ControlContainer>


            <Header>Para onde está indo {"\n"}seu dinheiro?</Header>

            <BoxContainer>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        <BoxTag>
                            <BoxTagText numberOfLines={1}>Receitas</BoxTagText>
                            <BoxTagPriceText numberOfLines={1}>R$2.400,00</BoxTagPriceText>
                            <StackedBarChart
                                style={{ height: 4 }}
                                keys={['incomes', 'outcomes']}
                                colors={['#588A36', '#dddddd']}
                                data={[{ month: new Date(2015, 0, 1), incomes: 3840, outcomes: 1920 }]}
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
                                style={{ height: 4 }}
                                keys={['incomes', 'outcomes']}
                                colors={['#588A36', '#dddddd']}
                                data={[{ month: new Date(2015, 0, 1), incomes: 3840, outcomes: 10020 }]}
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
                                style={{ height: 4 }}
                                keys={['incomes', 'outcomes']}
                                colors={['#588A36', '#dddddd']}
                                data={[{ month: new Date(2015, 0, 1), incomes: 8440, outcomes: 1920 }]}
                                showGrid={false}
                                horizontal={true}
                            />
                        </BoxTag>
                    </View>
                </ScrollView>
            </BoxContainer>

            <Header>Despesas em aberto</Header>
        </Container>
    );
}