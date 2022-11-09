import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {ThemeContext} from '../context/theme/ThemeContext';
import {ConfirmCodeEmailScreen} from '../screens/auth/ConfirmCodeEmailScreen';
import {ForgotPasswordScreen} from '../screens/auth/ForgotPasswordScreen';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {RegisterScreen} from '../screens/auth/RegisterScreen';
import {UpdatePasswordScreen} from '../screens/auth/UpdatePasswordScreen';


export type AuthStackNavigator = {
  LoginScreen: undefined
  RegisterScreen: undefined
  ForgotPasswordScreen: undefined
  ConfirmCodeEmailScreen: undefined
  UpdatePasswordScreen: undefined
}


const Stack = createNativeStackNavigator<AuthStackNavigator>();


export const AuthNavigation = () => {

  const {theme:{colors}} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
        headerBackTitle:'Atras'
      }}
    >

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: 'Recuperar contraseña',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="ConfirmCodeEmailScreen"
        component={ConfirmCodeEmailScreen}
        options={{
          title: 'Confirmar código',
          headerShown: true,
        }}
      />

      <Stack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
        options={{
          title: 'Actualizar contraseña',
          headerShown: true,
        }}
      />

    </Stack.Navigator>

  )
}
