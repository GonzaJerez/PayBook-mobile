import {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ThemeContext} from '../context/theme/ThemeContext';
import {AccountInfoScreen} from '../screens/private/account/AccountInfoScreen';
import {EditAccountNameScreen} from '../screens/private/account/EditAccountNameScreen';
import {UsersInAccountScreen} from '../screens/private/account/UsersInAccountScreen';
import {AccessKeyScreen} from '../screens/private/account/AccessKeyScreen';
import {CategoriesListScreen} from '../screens/private/account/CategoriesListScreen';
import {SubcategoriesListScreen} from '../screens/private/account/SubcategoriesListScreen';
import {SettingsButton} from '../components/navigation-ui/SettingsButton';
import {EditCategoryScreen} from '../screens/private/account/EditCategoryScreen';
import {NewCategoryScreen} from '../screens/private/account/NewCategoryScreen';
import {Category} from '../interfaces/Category';
import {Subcategory} from '../interfaces/Subcategory';
import {NewAccountNavigation} from './NewAccountTopTab';
import {CreditExpensesScreen} from '../screens/private/account/CreditExpensesScreen';
import {DetailCreditExpenseScreen} from '../screens/private/account/DetailCreditExpenseScreen';
import {EditCreditExpenseScreen} from '../screens/private/account/EditCreditExpenseScreen';



export type AccountStackNavigation = {
  NewAccountNavigation: undefined;
  AccountInfoScreen: undefined;
  EditAccountNameScreen: undefined;
  UsersInAccountScreen: undefined;
  AccessKeyScreen: undefined;
  CategoriesListScreen: undefined;
  SubcategoriesListScreen: undefined;
  EditCategoryScreen: {type: 'categoría' | 'subcategoría', element: Category | Subcategory | null};
  NewCategoryScreen: {type: 'categoría' | 'subcategoría'};
  CreditExpensesScreen: undefined;
  DetailCreditExpenseScreen: undefined;
  EditCreditExpenseScreen: undefined;
}

const Stack = createNativeStackNavigator<AccountStackNavigation>();

export function AccountNavigation() {

  const {theme} = useContext(ThemeContext)

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerBackTitle: 'Atras',
        headerTintColor: '#111',
        headerBackTitleVisible: false,
        contentStyle:{
          backgroundColor: theme.colors.background
        }
      }}
    >

      <Stack.Screen
        name="NewAccountNavigation"
        component={NewAccountNavigation}
        options={{
          title: 'Nueva cuenta',
          headerShadowVisible: false
        }}
      />

      <Stack.Screen
        name="AccountInfoScreen"
        component={AccountInfoScreen}
        options={{
          title: 'Información de cuenta'
        }}
      />

      <Stack.Screen
        name="EditAccountNameScreen"
        component={EditAccountNameScreen}
        options={{
          title: 'Editar nombre'
        }}
      />

      <Stack.Screen
        name="UsersInAccountScreen"
        component={UsersInAccountScreen}
        options={{
          title: 'Usuarios'
        }}
      />

      <Stack.Screen
        name="AccessKeyScreen"
        component={AccessKeyScreen}
        options={{
          title: 'Clave de acceso'
        }}
      />

      <Stack.Screen
        name="CategoriesListScreen"
        component={CategoriesListScreen}
        options={{
          title: 'Categorías'
        }}
      />

      <Stack.Screen
        name="SubcategoriesListScreen"
        component={SubcategoriesListScreen}
        options={{
          title: 'Subcategorías',
          headerRight: ()=>(
            <SettingsButton />
          )
        }}
      />

      <Stack.Screen
        name='EditCategoryScreen'
        component={EditCategoryScreen}
        options={{
          title: 'Editar',
        }}
      />

      <Stack.Screen
        name='NewCategoryScreen'
        component={NewCategoryScreen}
        options={{
          title: 'Crear',
        }}
      />

      <Stack.Screen
        name='CreditExpensesScreen'
        component={CreditExpensesScreen}
        options={{
          title: 'Gastos en cuotas',
        }}
      />

      <Stack.Screen
        name='DetailCreditExpenseScreen'
        component={DetailCreditExpenseScreen}
        options={{
          title: 'Gasto en cuotas',
        }}
      />

      <Stack.Screen
        name='EditCreditExpenseScreen'
        component={EditCreditExpenseScreen}
        options={{
          title: 'Editar gasto en cuotas',
        }}
      />

    </Stack.Navigator>
  );
}