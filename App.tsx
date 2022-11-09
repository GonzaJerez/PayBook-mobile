import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AuthProvider} from './src/context/auth/AuthContext';
import {ThemeProvider} from './src/context/theme/ThemeContext';
import {RootNavigation} from './src/navigation/RootNavigation';
import {RequestsStatusProvider} from './src/context/requests-status/RequestsStatusContext';


export default function App() {

  return (
    <SafeAreaProvider>
      <StatusBar />

      <AppState>
        <RootNavigation />
      </AppState>

    </SafeAreaProvider>
  );

}

const AppState = ({children}: {children:JSX.Element | JSX.Element[]}) => (
  <RequestsStatusProvider>
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  </RequestsStatusProvider>
)