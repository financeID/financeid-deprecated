import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home';
import TransactionScreen from '../screens/TransactionScreen';
import ReportsScreen from '../screens/ReportsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}

function TransactionStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Transações" component={TransactionScreen} />
    </HomeStack.Navigator>
  );
}

function ReportsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Relatórios" component={ReportsScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Perfil" component={ProfileScreen} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function AppStack() {
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
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          /*tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),*/
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={TransactionStackScreen}
        options={{
          title: 'Transações',
        }}
      />

      <Tab.Screen
        name="Reports"
        component={ReportsStackScreen}
        options={{
          title: 'Relatórios',
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileStackScreen}
        options={{
          title: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
}
