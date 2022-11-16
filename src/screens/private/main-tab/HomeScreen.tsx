import { useNavigation } from '@react-navigation/native';
import {
	NativeStackNavigationProp,
	NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { TertiaryButton } from '../../../components/buttons/TertiaryButton';

import { CarouselAmounts } from '../../../components/carousels/CarouselAmounts';
import { ShowExpensesCard } from '../../../components/lists/ShowExpensesCard';
import { EmptyData } from '../../../components/texts/EmptyData';
import { LIMIT_EXPENSES_HOME } from '../../../constants/ContantsAccounts';
import { AccountsContext } from '../../../context/accounts/AccountsContext';
import { ExpensesContext } from '../../../context/expenses/ExpensesContext';
import { ThemeContext } from '../../../context/theme/ThemeContext';
import { PrivateStackNavigation } from '../../../navigation/PrivateNavigation';
import { TabBarNavigation } from '../../../navigation/TabNavigation';

export const HomeScreen = () => {
	const { theme } = useContext(ThemeContext);
	const { actualAccount, isLoading } = useContext(AccountsContext);
	const { lastExpenses, getLastExpenses } = useContext(ExpensesContext);

	const { navigate } =
		useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>();

	useEffect(() => {
		getLastExpenses();
	}, [actualAccount]);

	if (isLoading) {
		return <ActivityIndicator color={theme.colors.primary} />;
	}

	if (!actualAccount) {
		return (
			<View style={styles.emptyDataContainer}>
				<EmptyData text="No tienes ninguna cuenta. Crea o unete a alguna para empezar a ordenar tus gastos." />
				<TertiaryButton
					label="Crear o unirme a una cuenta"
					onPress={() =>
						navigate('AccountNavigation', {
							screen: 'NewAccountNavigation',
						})
					}
				/>
			</View>
		);
	}

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: theme.colors.card }]}
		>
			<ShowExpensesCard
				data={lastExpenses.slice(0, LIMIT_EXPENSES_HOME)}
				title="Últimos gastos"
				showAllExpensesButton
			>
				<CarouselAmounts />
			</ShowExpensesCard>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	emptyDataContainer: {
		alignItems: 'center',
	},
});
