import React, { useContext, useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Field } from '../../../components/form/Field';
import { AccountStackNavigation } from '../../../navigation/AccountNavigation';
import { SubmitOrCancelButtons } from '../../../components/buttons/SubmitOrCancelButtons';
import { CategoriesContext } from '../../../context/categories/CategoriesContext';
import { CreateCategory } from '../../../interfaces/Category';
import { SubcategoriesContext } from '../../../context/subcategories/SubcategoriesContext';
import { CreateSubcategory } from '../../../interfaces/Subcategory';
import {ErrorRequest} from '../../../components/texts/ErrorRequest';

interface Props
	extends NativeStackScreenProps<AccountStackNavigation, 'NewCategoryScreen'> {}

export const NewCategoryScreen = ({ navigation, route }: Props) => {
	const { type } = route.params;
	const { isLoading, createCategory } = useContext(CategoriesContext);
	const { createSubcategory } = useContext(SubcategoriesContext);
	const [error, setError] = useState<string>()

	useEffect(() => {
		navigation.setOptions({
			title: `Crear ${type}`,
		});
	}, []);

	const toCreate = async (values: CreateCategory | CreateSubcategory) => {
		let hasError;
		if (type === 'categoría') {
			const errorMessage = await createCategory(values);
			hasError = errorMessage;
		}
		if (type === 'subcategoría') {
			const errorMessage = await createSubcategory(values);
			hasError = errorMessage
		}

		if (hasError) {
			setError(hasError);
		} else {
			navigation.goBack();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.formContainer}>
				<Formik
					initialValues={{ name: '' }}
					onSubmit={toCreate}
					validationSchema={Yup.object({
						name: Yup.string()
							.max(30, 'Nombre demasiado largo')
							.required('El nombre no puede quedar vacío'),
					})}
				>
					{({ handleSubmit, errors, touched }) => (
						<>
							<Field
								label={`Nombre de la ${type}`}
								placeholder={`Ej. ${
									type === 'categoría' ? 'Comidas' : 'Verduras'
								}`}
								name="name"
							/>
							{error && <ErrorRequest>{error}</ErrorRequest>}
							<SubmitOrCancelButtons
								onSubmit={handleSubmit}
								onCancel={navigation.goBack}
								isLoading={isLoading}
								disable={
									Object.keys(errors).length > 0 ||
									Object.keys(touched).length === 0
								}
								marginTop={0}
							/>
						</>
					)}
				</Formik>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
	},
	formContainer: {
		marginTop: 40,
	},
});
