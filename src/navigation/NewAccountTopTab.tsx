import {useContext} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import {ThemeContext} from '../context/theme/ThemeContext';
import {CreateAccountScreen} from '../screens/private/account/NewAccountTopTab/CreateAccountScreen';
import {JoinToAccountScreen} from '../screens/private/account/NewAccountTopTab/JoinToAccountScreen';


export type NewAccountTopTabNavigation = {
  CreateAccountScreen: undefined;
  JoinToAccountScreen: undefined;
}

const Tab = createMaterialTopTabNavigator<NewAccountTopTabNavigation>();

export function NewAccountNavigation() {

  const {theme} = useContext(ThemeContext)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle:{
          backgroundColor:theme.colors.primary
        },
        tabBarActiveTintColor: theme.colors.card,
        tabBarLabelStyle:{fontWeight: '600'},
        tabBarIndicatorStyle:{backgroundColor:theme.colors.card},
      }}
    >
      <Tab.Screen 
        name="CreateAccountScreen" 
        component={CreateAccountScreen} 
        options={{
          title:'Crear cuenta'
        }}
      />
      <Tab.Screen 
        name="JoinToAccountScreen" 
        component={JoinToAccountScreen}
        options={{
          title:'Unirme a una cuenta'
        }}
      />
    </Tab.Navigator>
  );
}