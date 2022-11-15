import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ExpenseItem } from '../../components/item-lists/ExpenseItem';

import { DefaultSeparator } from '../../components/separators/DefaultSeparator';
import { AccountsContext } from '../../context/accounts/AccountsContext';
import { ExpensesContext } from '../../context/expenses/ExpensesContext';
import { Expense } from '../../interfaces/Expense';
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation';

const LIMIT = 20;

interface Props extends NativeStackScreenProps<PrivateStackNavigation,'AllExpensesScreen'>{}

export const AllExpensesScreen = ({route}:Props) => {

  const {stats} = route.params;

	const { actualAccount } = useContext(AccountsContext);
	const { getAllExpenses } = useContext(ExpensesContext);
	const [skip, setSkip] = useState(0);

	const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

	const getExpenses = async () => {
		const res = await getAllExpenses({ limit: LIMIT, skip });
		setAllExpenses([...allExpenses, ...res?.expenses || []]);
		setSkip(skip + LIMIT);
	};

	useEffect(() => {
		getExpenses();
	}, [actualAccount]);

	return (
		<FlatList
			data={(stats) ? stats : allExpenses}
			renderItem={({ item }) => <ExpenseItem key={item.id} expense={item} />}
			onEndReached={(stats) ? ()=>{} : getExpenses}
      ListFooterComponent={(<DefaultSeparator />)}
		/>
	);
};

const styles = StyleSheet.create({

});
