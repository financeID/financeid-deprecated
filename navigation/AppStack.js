import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import TransactionScreen from '../screens/TransactionScreen';
import AddTransactions from '../screens/AddTransactions';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TransactionStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Transações"
        options={{ headerShown: true, headerTitleAlign: 'center' }}
        component={TransactionScreen}
      />
    </HomeStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {
          //maxWidth: 90,
        },
        style: {
          borderTopColor: 'rgba(255, 255, 255, 0.35)',
          borderTopWidth: 0.5,
          flexDirection: 'row',
          alignItems: 'flex-start',
        },
        labelStyle: {
          fontSize: 12,
          padding: 15,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Transações" component={TransactionStackScreen} />
    </Tab.Navigator>
  );
}

export default function AppStack() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeStackScreen}
      />
      <HomeStack.Screen
        options={{ title: 'Adicionar', headerBackTitle: '' }}
        name="addIncome"
        component={AddTransactions}
      />
    </HomeStack.Navigator>
  );
}
