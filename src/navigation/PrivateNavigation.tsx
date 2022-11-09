import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ThemeContext} from '../context/theme/ThemeContext';
import {SuscriptionNavigation, SuscriptionStackNavigation} from './SuscriptionNavigation';
import {TabNavigation} from './TabNavigation';
import {UserNavigation} from './UserNavigation';
import {AccountNavigation, AccountStackNavigation} from './AccountNavigation';
import {AccountsProvider} from '../context/accounts/AccountsContext';
import {CategoriesProvider} from '../context/categories/CategoriesContext';
import {SubcategoriesProvider} from '../context/subcategories/SubcategoriesContext';
import {ExpensesProvider} from '../context/expenses/ExpensesContext';
import {ExpensesNavigation, ExpenseStackNavigation} from './ExpensesNavigation';
import {CreditExpensesProvider} from '../context/credit-expenses/CreditExpensesContext';


export type PrivateStackNavigation = {
  TabNavigation: undefined
  UserNavigation: undefined
  SuscriptionNavigation: {screen: keyof SuscriptionStackNavigation}
  AccountNavigation: {screen: keyof AccountStackNavigation};
  ExpensesNavigation: {screen: keyof ExpenseStackNavigation}
}

const Stack = createNativeStackNavigator<PrivateStackNavigation>();

export function PrivateNavigation() {

  const {theme} = useContext(ThemeContext)

  return (
    <PrivateContexts>

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
          name="TabNavigation"
          component={TabNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="UserNavigation"
          component={UserNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen 
          name="SuscriptionNavigation" 
          component={SuscriptionNavigation} 
          options={{headerShown: false}} 
        />

        <Stack.Screen
          name="AccountNavigation"
          component={AccountNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="ExpensesNavigation"
          component={ExpensesNavigation}
          options={{headerShown: false}}
        />

      </Stack.Navigator>

    </PrivateContexts>
  );
}

const PrivateContexts = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <AccountsProvider>
      <CategoriesProvider>
        <SubcategoriesProvider>
          <ExpensesProvider>
            <CreditExpensesProvider>
              {children}
            </CreditExpensesProvider>
          </ExpensesProvider>
        </SubcategoriesProvider>
      </CategoriesProvider>
    </AccountsProvider>
  )
}