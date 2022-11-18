import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';
import { ThemeContext } from '../context/theme/ThemeContext';
import {SuscriptionScreen} from '../screens/private/suscription/SuscriptionScreen';
import { EditEmailScreen } from '../screens/private/user/EditEmailScreen';
import { EditPasswordScreen } from '../screens/private/user/EditPasswordScreen';
import { EditUserNameScreen } from '../screens/private/user/EditUserNameScreen';
import { UserScreen } from '../screens/private/user/UserScreen';


export type UserStackNavigation = {
	UserScreen: undefined;
	EditUserNameScreen: undefined;
	EditEmailScreen: undefined;
	EditPasswordScreen: undefined;
	SuscriptionScreen: {tryToCreateNewAccount?: boolean};
};

const Stack = createNativeStackNavigator<UserStackNavigation>();

export function UserNavigation() {
	const { theme } = useContext(ThemeContext);

	return (
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
				name="UserScreen"
				component={UserScreen}
				options={{
					title: 'Perfil',
				}}
			/>

			<Stack.Screen
				name="EditUserNameScreen"
				component={EditUserNameScreen}
				options={{
					title: 'Editar nombre',
				}}
			/>

			<Stack.Screen
				name="EditEmailScreen"
				component={EditEmailScreen}
				options={{
					title: 'Editar email',
				}}
			/>

			<Stack.Screen
				name="EditPasswordScreen"
				component={EditPasswordScreen}
				options={{
					title: 'Editar contraseña',
				}}
			/>

			<Stack.Screen
				name="SuscriptionScreen"
				component={SuscriptionScreen}
				options={{ title: 'Suscripciones' }}
			/>
		</Stack.Navigator>
	);
}
