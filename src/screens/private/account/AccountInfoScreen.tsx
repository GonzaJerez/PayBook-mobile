import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { OptionsButton } from '../../../components/buttons/OptionsButton';
import { AccountInfoList } from '../../../components/lists/AccountInfoList';
import { AccountsContext } from '../../../context/accounts/AccountsContext';
import { AuthContext } from '../../../context/auth/AuthContext';
import { useAccountActions } from '../../../hooks/useAccountActions';
import { AccountStackNavigation } from '../../../navigation/AccountNavigation';

interface Props
	extends NativeStackScreenProps<AccountStackNavigation, 'AccountInfoScreen'> {}

export const AccountInfoScreen = ({ navigation }: Props) => {
	const { user } = useContext(AuthContext);
	const { actualAccount } = useContext(AccountsContext);
	const { showAlertDelete, showAlertLeave } = useAccountActions();
  

	const options = [
		{
			label: 'Abandonar cuenta',
			onPress: showAlertLeave,
			icon: 'exit-outline',
		},
		{
			label: 'Eliminar cuenta',
			onPress: showAlertDelete,
			icon: 'trash-outline',
      disabled: actualAccount?.admin_user.id !== user?.id
		},
	];

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <OptionsButton options={options} />,
		});
	}, []);

	return (
		<ScrollView style={styles.container}>
			<AccountInfoList />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
