import { ActivityIndicator, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { PasswordField } from './PasswordField';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { AuthStackNavigator } from '../../navigation/AuthNavigation';
import { useRecoveryAccount } from '../../hooks/useRecoveryAccount';
import { ErrorRequest } from '../texts/ErrorRequest';
import { ThemeContext } from '../../context/theme/ThemeContext';

interface Props {
	navigation: NativeStackNavigationProp<
		AuthStackNavigator,
		'UpdatePasswordScreen'
	>;
	email: string;
}

export const UpdatePasswordForm = ({ navigation, email }: Props) => {
	const { theme } = useContext(ThemeContext);
	const { renewPassword, isLoading } = useRecoveryAccount();
	const [error, setError] = useState<string>()

	const onSubmit = async (password: string) => {
		const errorMessage = await renewPassword(email, password);
		if (errorMessage){
			setError(errorMessage)
		} else {
			navigation.navigate('LoginScreen');
		}
	};

	return (
		<Formik
			initialValues={{
				password1: '',
				password2: '',
			}}
			onSubmit={({ password1 }) => onSubmit(password1)}
			validationSchema={Yup.object({
				password1: Yup.string()
					.min(8, 'La contraseña debe tener mínimo 8 caracteres')
					.required('La contraseña es obligatoria'),
				password2: Yup.string()
					.required()
					.oneOf([Yup.ref('password1')], 'Las contraseñas no coinciden'),
			})}
		>
			{({ handleSubmit, errors, touched }) => (
				<>
					{isLoading && (
						<ActivityIndicator
							size={30}
							color={theme.colors.primary}
							style={styles.loadingSpinner}
						/>
					)}
					<PasswordField
						label="Ingrese una nueva contraseña"
						placeholder="········"
						name="password1"
					/>
					<PasswordField
						label="Confirme la contraseña"
						placeholder="········"
						name="password2"
					/>
					{error && <ErrorRequest>{error}</ErrorRequest>}
					<PrimaryButton
						label="Confirmar cambio"
						style={styles.submitButton}
						onPress={handleSubmit}
						disable={
							Object.keys(errors).length > 0 ||
							Object.keys(touched).length === 0
						}
					/>
				</>
			)}
		</Formik>
	);
};

const styles = StyleSheet.create({
	loadingSpinner: {
		marginBottom: 10,
	},
	submitButton: {
		marginTop: 30,
	},
});
