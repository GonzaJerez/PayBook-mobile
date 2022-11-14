import React, {useContext} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthContext} from '../context/auth/AuthContext';
import {AuthNavigation} from './AuthNavigation';
import {PrivateNavigation} from './PrivateNavigation';
import {StatusNotification} from '../components/notifications/StatusNotification';
import {RequestsStatusContext} from '../context/requests-status/RequestsStatusContext';
import {CheckingStatus} from '../components/brand/CheckingStatus';
import {ThemeContext} from '../context/theme/ThemeContext';


export type RootStackNavigation = {
  AuthNavigation: undefined,
  PrivateNavigator: undefined;
}

const Stack = createNativeStackNavigator<RootStackNavigation>();

export function RootNavigation() {

  const {theme} = useContext(ThemeContext)
  const {status} = useContext(AuthContext)
  const {showingNotification ,isConnectionFailed, clearConnectionFailure} = useContext(RequestsStatusContext)

  if (status === 'checking') {
    return (
      <CheckingStatus />
    )
  }

  if (isConnectionFailed) {
    Alert.alert(
      'Fallo de conexión',
      'Hay un problema en la conexión, verifica que tengas conexión a internet y vuelve a intentarlo',
      [
        {
          text: 'OK',
          onPress: clearConnectionFailure
        }
      ])
  }

  return (
    <NavigationContainer
      theme={theme}
    >

      {(showingNotification) && (
        <StatusNotification />
      )}

      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {
          (status === 'not-authenticated')
            ? (
              <Stack.Screen
                name="AuthNavigation"
                component={AuthNavigation}
              />
            )
            : (
              <Stack.Screen
                name="PrivateNavigator"
                component={PrivateNavigation}
              />
            )
        }

      </Stack.Navigator>

    </NavigationContainer>
  );
}