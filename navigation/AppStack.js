import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import TransactionScreen from '../screens/Transactions';
import ProfileScreen from '../screens/ProfileScreen';
import AddTransactions from '../screens/AddTransactions';
import TagManager from '../screens/TagManager';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

/*function TransactionStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Transações"
        component={TransactionScreen}
        options={{
          title: 'Transações',
          headerShown: false,
          headerTitleAlign: 'left',
          headerStyle: {},
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </HomeStack.Navigator>
  );
}*/

function ProfileStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Perfil"
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
        }}
        component={ProfileScreen}
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
      <Tab.Screen name="Transações" component={TransactionScreen} />
      <Tab.Screen name="Perfil" component={ProfileStackScreen} />
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
        options={{
          title: 'Adicionar',
          headerBackTitle: 'Voltar',
        }}
        name="AddIncome"
        component={AddTransactions}
      />
      <HomeStack.Screen
        options={{ title: 'Tags', headerBackTitle: 'Voltar' }}
        name="TagManager"
        component={TagManager}
      />
    </HomeStack.Navigator>
  );
}
