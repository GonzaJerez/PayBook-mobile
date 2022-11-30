import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { ExpenseItem } from '../../components/item-lists/ExpenseItem';

import { DefaultSeparator } from '../../components/separators/DefaultSeparator';
import { AccountsContext } from '../../context/accounts/AccountsContext';
import { ExpensesContext } from '../../context/expenses/ExpensesContext';
import {ThemeContext} from '../../context/theme/ThemeContext';
import { Expense } from '../../interfaces/Expense';
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation';

const LIMIT = 10;

interface Props extends NativeStackScreenProps<PrivateStackNavigation,'AllExpensesScreen'>{}

export const AllExpensesScreen = ({route}:Props) => {

  const {stats} = route.params;

	const {theme} = useContext(ThemeContext)
	const { getAllExpenses, isLoading } = useContext(ExpensesContext);
	const [skip, setSkip] = useState(0);
	const [allElementsLoaded, setAllElementsLoaded] = useState(false)

	const [allExpenses, setAllExpenses] = useState<Expense[]>([]);

	const getExpenses = async () => {
		const res = await getAllExpenses({ limit: LIMIT, skip });
		if(res?.expenses.length === 0){
			setAllElementsLoaded(true)
		}
		setAllExpenses([...allExpenses, ...res?.expenses || []]);
		setSkip(skip + LIMIT);
	};

	useEffect(() => {
		if(!stats){
			getExpenses();
		}
	}, []);

	return (
		<FlatList
			data={(stats) ? stats : allExpenses}
			renderItem={({ item }) => <ExpenseItem key={item.id} expense={item} />}
			onEndReached={(stats || allElementsLoaded) ? ()=>{} : getExpenses}
      ListFooterComponent={(isLoading) 
				? (<ActivityIndicator color={theme.colors.primary}/>)
				: (<DefaultSeparator />)
			}
		/>
	);
};

const styles = StyleSheet.create({

});
