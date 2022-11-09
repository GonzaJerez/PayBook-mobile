import {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {ThemeContext} from '../context/theme/ThemeContext';
import {NewExpenseScreen} from '../screens/private/main-tab/create-expense/NewExpenseScreen';
import {PayInstallmentScreen} from '../screens/private/main-tab/create-expense/PayInstallmentScreen';


export type CreateExpenseTopTabNavigation = {
  NewExpenseScreen: undefined;
  PayInstallmentScreen: undefined;
}

const Tab = createMaterialTopTabNavigator<CreateExpenseTopTabNavigation>();

export function CreateExpenseTopTab() {

  const {theme} = useContext(ThemeContext)

  return (

    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.primary
        },
        tabBarActiveTintColor: theme.colors.card,
        tabBarLabelStyle: {fontWeight: '600'},
        tabBarIndicatorStyle: {backgroundColor: '#fff'},
      }}
    >

      <Tab.Screen
        name="NewExpenseScreen"
        component={NewExpenseScreen}
        options={{
          title: 'Nuevo gasto',
        }}
      />

      <Tab.Screen
        name="PayInstallmentScreen"
        component={PayInstallmentScreen}
        options={{
          title: 'Pagar cuota',
        }}
      />

    </Tab.Navigator>

  );
}