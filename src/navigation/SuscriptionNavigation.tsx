import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useContext} from 'react';
import {ThemeContext} from '../context/theme/ThemeContext';
import {SuscriptionScreen} from '../screens/private/suscription/SuscriptionScreen';


export type SuscriptionStackNavigation = {
  SuscriptionScreen: undefined;
}

const Stack = createNativeStackNavigator<SuscriptionStackNavigation>();

export function SuscriptionNavigation() {

  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="SuscriptionScreen"
        component={SuscriptionScreen}
        options={{title: 'Suscripciones'}}
      />

    </Stack.Navigator>
  );
}