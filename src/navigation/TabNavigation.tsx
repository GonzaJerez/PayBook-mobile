import {useContext} from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import {AccountPicker} from '../components/navigation-ui/AccountPicker';
import {NewExpenseButton} from '../components/navigation-ui/NewExpenseButton';
import {RightHeader} from '../components/navigation-ui/RightHeader';
import {ThemeContext} from '../context/theme/ThemeContext';
import {HomeScreen} from '../screens/private/main-tab/HomeScreen';
import {StatsScreen} from '../screens/private/main-tab/StatsScreen';
import {CreateExpenseTopTab} from './CreateExpenseTopTab';
import {StatisticsProvider} from '../context/statistics/StatisticsContext';
import {AllExpensesScreen} from '../screens/expenses/AllExpensesScreen';
import {AccountsContext} from '../context/accounts/AccountsContext';



export type TabBarNavigation = {
  HomeScreen: undefined
  StatsScreen: undefined
  CreateExpenseTopTab: undefined
}


const Tab = createBottomTabNavigator<TabBarNavigation>();

export const TabNavigation = () => {

  const {theme} = useContext(ThemeContext)
  const {actualAccount} = useContext(AccountsContext)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {display: (actualAccount) ? 'flex' : 'none'},
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTitle: () => (
          <AccountPicker />
        ),
        headerRight: () => (
          <RightHeader />
        )
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.background
      }}
    >

      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="wallet-outline"
              color={(focused)
                ? theme.colors.primary
                : theme.disable
              }
              size={(focused) ? 30 : 25}
            />
          )
        }}
      />

      <Tab.Screen
        name="CreateExpenseTopTab"
        component={CreateExpenseTopTab}
        options={{
          title: 'Nuevo gasto',
          tabBarLabel: () => (<View />),
          tabBarButton: ({onPress}) => (
            <NewExpenseButton onPress={onPress} />
          ),
          headerShadowVisible: false,
          unmountOnBlur: true
        }}
      />


      <Tab.Screen
        name="StatsScreen"
        component={StatsWithContext}
        options={{
          title: 'Estadísticas',
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="stats-chart-outline"
              color={(focused)
                ? theme.colors.primary
                : theme.disable
              }
              size={(focused) ? 30 : 25}
            />
          )
        }}
      />

    </Tab.Navigator>

  )
}

const StatsWithContext = () => {
  return (
    <StatisticsProvider>
      <StatsScreen />
    </StatisticsProvider>
  )
}