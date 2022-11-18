import React, { useContext, useEffect } from 'react';

import { RowInfo } from '../item-lists/RowInfo';
import { DataDescription } from '../item-lists/DataDescription';
import { ExpensesContext } from '../../context/expenses/ExpensesContext';
import { currencyFormat } from '../../helpers/currencyFormat';
import { InfoListContainer } from './InfoListContainer';
import { useNavigation } from '@react-navigation/native';
import { PrivateStackNavigation } from '../../navigation/PrivateNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RowInfoPressable } from '../item-lists/RowInfoPressable';
import { CreditExpensesContext } from '../../context/credit-expenses/CreditExpensesContext';

export const ListDetailsExpense = () => {
	const { actualExpense } = useContext(ExpensesContext);
	// const { getCreditPaymentById } = useContext(CreditExpensesContext);
	const yearWithTwoDigits = String(actualExpense?.year).slice(2);
	const formatDate = `${actualExpense?.num_date}/${actualExpense?.month}/${yearWithTwoDigits}`;

	const { navigate } =
		useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>();

	// useEffect(() => {
	// 	getCreditPaymentById(actualExpense?.credit_payment?.id || '');
	// }, [actualExpense]);

	const onViewDetailsCreditPayment = () => {
		if (!actualExpense?.credit_payment) return;
		navigate('AccountNavigation', {
			screen: 'DetailCreditExpenseScreen',
		});
	};

	return (
		<InfoListContainer>
			<RowInfo
				label="Monto"
				value={currencyFormat(actualExpense?.amount || 0)}
			/>
			<RowInfo label="Categoría" value={actualExpense?.category.name || ''} />
			<RowInfo
				label="Subcategoría"
				value={actualExpense?.subcategory.name || ''}
			/>
			<RowInfo
				label="Fecha"
				value={`${actualExpense?.day_name}, ${formatDate}`}
			/>
			<RowInfo label="Usuario" value={actualExpense?.user.fullName || ''} />
			<>
				{actualExpense?.credit_payment && (
					<>
						<RowInfoPressable
							onPress={onViewDetailsCreditPayment}
							label="Couta pagada"
							value="Sí"
						/>
						<RowInfo
							label="Referencia"
							value={actualExpense.credit_payment.name}
						/>
					</>
				)}
			</>

			<DataDescription description={actualExpense?.description || ''} />
		</InfoListContainer>
	);
};
