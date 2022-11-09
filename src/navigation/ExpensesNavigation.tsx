import {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ThemeContext} from '../context/theme/ThemeContext';
import {AllExpensesScreen} from '../screens/expenses/AllExpensesScreen';
import {DetailsExpenseScreen} from '../screens/expenses/DetailsExpenseScreen';
import {EditExpenseScreen} from '../screens/expenses/EditExpenseScreen';



export type ExpenseStackNavigation = {
  DetailsExpenseScreen: undefined;
  AllExpensesScreen: undefined;
  EditExpenseScreen: undefined;
}

const Stack = createNativeStackNavigator<ExpenseStackNavigation>();

export function ExpensesNavigation() {

  const {theme} = useContext(ThemeContext)

  return (

    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerBackTitle: 'Atras',
        headerTintColor: '#111',
        headerBackTitleVisible: false
      }}
    >

      <Stack.Screen
        name="DetailsExpenseScreen"
        component={DetailsExpenseScreen}
        options={{
          title: 'Detalle gasto',
        }}
      />

      <Stack.Screen
        name="AllExpensesScreen"
        component={AllExpensesScreen}
        options={{
          title: 'Todos los gastos'
        }}
      />

      <Stack.Screen
        name="EditExpenseScreen"
        component={EditExpenseScreen}
        options={{
          title: 'Editar gasto'
        }}
      />

    </Stack.Navigator>

  );
}