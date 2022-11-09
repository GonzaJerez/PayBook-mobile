import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useContext} from 'react';
import {ThemeContext} from '../context/theme/ThemeContext';
import {EditEmailScreen} from '../screens/private/user/EditEmailScreen';
import {EditPasswordScreen} from '../screens/private/user/EditPasswordScreen';
import {EditUserNameScreen} from '../screens/private/user/EditUserNameScreen';
import {UserScreen} from '../screens/private/user/UserScreen';
import {SuscriptionNavigation, SuscriptionStackNavigation} from './SuscriptionNavigation';


export type UserStackNavigation = {
  UserScreen: undefined;
  EditUserNameScreen: undefined;
  EditEmailScreen: undefined;
  EditPasswordScreen: undefined;
  SuscriptionNavigation: {screen: keyof SuscriptionStackNavigation};
}

const Stack = createNativeStackNavigator<UserStackNavigation>();

export function UserNavigation() {

  const {theme} = useContext(ThemeContext)

  return (

    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerBackTitle: 'Atras',
        headerTintColor: '#111',
        headerBackTitleVisible: false
      }}
    >

      <Stack.Screen 
        name="UserScreen" 
        component={UserScreen} 
        options={{
          title:'Perfil',
        }}
      />

      <Stack.Screen 
        name="EditUserNameScreen" 
        component={EditUserNameScreen} 
        options={{
          title:'Editar nombre',
        }}
      />

      <Stack.Screen 
        name="EditEmailScreen" 
        component={EditEmailScreen} 
        options={{
          title:'Editar email',
        }}
      />

      <Stack.Screen 
        name="EditPasswordScreen" 
        component={EditPasswordScreen} 
        options={{
          title:'Editar contraseña',
        }}
      />

      <Stack.Screen 
        name="SuscriptionNavigation" 
        component={SuscriptionNavigation} 
        options={{
          headerShown:false,
        }}
      />

    </Stack.Navigator>
      
  );
}