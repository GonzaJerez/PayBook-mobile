import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InlineField } from './InlineField';
import { DateInput } from './DateInput';
import { RadioButtonsField } from './RadioButtonsField';
import { TextboxField } from './TextboxField';
import { SubmitOrCancelButtons } from '../buttons/SubmitOrCancelButtons';
import { TabBarNavigation } from '../../navigation/TabNavigation';
import { CategoriesContext } from '../../context/categories/CategoriesContext';
import { CategoryPicker } from '../fields/CategoryPicker';
import { CreateExpense } from '../../interfaces/Expense';
import { ErrorField } from '../texts/ErrorField';
import { ExpensesContext } from '../../context/expenses/ExpensesContext';

interface Props {
	initialValues: {
		amount: number;
		complete_date: Date;
		categoryId: string;
		subcategoryId: string;
		installments: number;
		description: string;
	};
	onSubmit: (body: CreateExpense) => Promise<string | undefined>;
}

const dataToRadioButtons = [
	{
		label: 'Un solo pago',
		value: false,
	},
	{
		label: 'Cuotas',
		value: true,
	},
];

export const ExpenseForm = ({ initialValues, onSubmit }: Props) => {
	const { goBack } =
		useNavigation<NativeStackNavigationProp<TabBarNavigation>>();
	const { allCategories, actualCategory, getCategories, setActualCategory } =
		useContext(CategoriesContext);
	const { isLoading } = useContext(ExpensesContext);
	const [error, setError] = useState<string>();

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		setActualCategory(
			allCategories.find((cat) => cat.id === initialValues.categoryId) || null
		);
	}, [allCategories]);

	const onCancel = (resetForm: () => void) => {
		resetForm();
		goBack();
	};

	const onSubmitForm = async (values: CreateExpense, resetForm: () => void) => {
		const errorMessage = await onSubmit(values);
		if (errorMessage) {
			setError(errorMessage);
		} else {
			resetForm();
			goBack();
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, { resetForm }) =>
				onSubmitForm(
					{
						...values,
						complete_date: values.complete_date.getTime(),
					},
					resetForm
				)
			}
			validationSchema={Yup.object({
				amount: Yup.number()
					.typeError('El monto debe ser un número entero (sin centavos).')
					.integer('El monto tiene que ser entero (sin centavos).')
					.required('El monto no puede quedar vacío')
					.positive('El monto no puede ser negativo'),
				complete_date: Yup.date().max(new Date()).required('Fecha inválida'),
				categoryId: Yup.string().required('La categoría es requerida'),
				subcategoryId: Yup.string().required('La subcategoría es requerida'),
				installments: Yup.number()
					.integer('El número de cuotas tiene que ser entero.')
					.positive('Las cuotas no pueden ser negativas')
					.required(),
				name_credit_payment: Yup.string().max(30, 'Máximo 30 caracteres.'),
				description: Yup.string().max(200, 'Máximo 200 caracteres.'),
			})}
		>
			{({ handleSubmit, errors, resetForm, values }) => (
				<View style={styles.formContainer}>
					<InlineField
						label="Monto"
						type="number-pad"
						name="amount"
						placeholder="100"
					/>
					<DateInput name="complete_date" />
					<CategoryPicker
						label="Categoría"
						name="categoryId"
						options={allCategories}
					/>
					<CategoryPicker
						label="Subcategoría"
						name="subcategoryId"
						options={actualCategory?.subcategories || []}
					/>
					<RadioButtonsField name="installments" data={dataToRadioButtons} />
					{values.installments > 1 && (
						<InlineField
							label="Nombre de referencia"
							name="name_credit_payment"
							placeholder="Ej. Televisor"
						/>
					)}
					<TextboxField name="description" />

					{error && <ErrorField>{error}</ErrorField>}

					<SubmitOrCancelButtons
						onSubmit={handleSubmit}
						onCancel={() => onCancel(resetForm)}
						disable={Object.keys(errors).length > 0}
						isLoading={isLoading}
					/>
				</View>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		paddingHorizontal: 30,
		marginTop: 40,
		marginBottom: 40,
	},
});
