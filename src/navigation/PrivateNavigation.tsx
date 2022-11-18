import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeContext } from '../context/theme/ThemeContext';
import { TabNavigation } from './TabNavigation';
import { UserNavigation } from './UserNavigation';
import { AccountNavigation, AccountStackNavigation } from './AccountNavigation';
import { AccountsProvider } from '../context/accounts/AccountsContext';
import { CategoriesProvider } from '../context/categories/CategoriesContext';
import { SubcategoriesProvider } from '../context/subcategories/SubcategoriesContext';
import { ExpensesProvider } from '../context/expenses/ExpensesContext';
import {
	ExpensesNavigation,
	ExpenseStackNavigation,
} from './ExpensesNavigation';
import { CreditExpensesProvider } from '../context/credit-expenses/CreditExpensesContext';
import { AllExpensesScreen } from '../screens/expenses/AllExpensesScreen';
import { Expense } from '../interfaces/Expense';
import {SuscriptionScreen} from '../screens/private/suscription/SuscriptionScreen';

export type PrivateStackNavigation = {
	TabNavigation: undefined;
	UserNavigation: undefined;
	AccountNavigation: { screen: keyof AccountStackNavigation };
	ExpensesNavigation: { screen: keyof ExpenseStackNavigation };
	SuscriptionScreen: {tryToCreateNewAccount?: boolean};
	AllExpensesScreen: { stats?: Expense[] };
};

const Stack = createNativeStackNavigator<PrivateStackNavigation>();

export function PrivateNavigation() {
	const { theme } = useContext(ThemeContext);

	return (
		<PrivateContexts>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: theme.colors.primary,
					},
					headerBackTitle: 'Atras',
					headerTintColor: '#111',
					headerBackTitleVisible: false,
				}}
			>
				<Stack.Screen
					name="TabNavigation"
					component={TabNavigation}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="UserNavigation"
					component={UserNavigation}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="AccountNavigation"
					component={AccountNavigation}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="ExpensesNavigation"
					component={ExpensesNavigation}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="SuscriptionScreen"
					component={SuscriptionScreen}
					options={{ title: 'Suscripciones' }}
				/>

				<Stack.Screen
					name="AllExpensesScreen"
					component={AllExpensesScreen}
					options={{ title: 'Todos los gastos' }}
				/>
			</Stack.Navigator>
		</PrivateContexts>
	);
}

const PrivateContexts = ({
	children,
}: {
	children: JSX.Element | JSX.Element[];
}) => {
	return (
		<AccountsProvider>
			<CategoriesProvider>
				<SubcategoriesProvider>
					<ExpensesProvider>
						<CreditExpensesProvider>{children}</CreditExpensesProvider>
					</ExpensesProvider>
				</SubcategoriesProvider>
			</CategoriesProvider>
		</AccountsProvider>
	);
};
