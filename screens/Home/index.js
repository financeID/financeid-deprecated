import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import * as firebase from 'firebase';
import useStatusBar from '../../hooks/useStatusBar';
import { auth, logout } from '../../components/Firebase/firebase';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { ProgressCircle } from 'react-native-svg-charts';

import { Text, G } from 'react-native-svg';

import { Container, Header, ControlContainer, ProgressView, CircleContainerText, DataContainer, DataText, DataSubText, DataView } from './styles';

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
            <Text x="0" y="7" fill="#588A36" textAnchor="middle" fontSize={20} fontWeight="bold">
                80%
            </Text>
        </G>
    );

    const TextProgressExpenses = () => (
        <G>
            <Text x="0" y="7" fill="#BB3E5D" textAnchor="middle" fontSize={20} fontWeight="bold">
                50%
            </Text>
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
        </Container>
    );
}