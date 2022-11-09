import React, {useContext} from 'react'

import {RowInfoPressable} from '../item-lists/RowInfoPressable'
import {RowInfo} from '../item-lists/RowInfo'
import {DataDescription} from '../item-lists/DataDescription'
import {InfoListContainer} from './InfoListContainer'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {AuthContext} from '../../context/auth/AuthContext'
import {AccountStackNavigation} from '../../navigation/AccountNavigation'



export const AccountInfoList = () => {

  const {navigate} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {actualAccount} = useContext(AccountsContext)
  const {user} = useContext(AuthContext)

  return (
    <InfoListContainer>

      {(actualAccount?.admin_user?.id === user?.id)
        ? (
          <RowInfoPressable
            label='Nombre'
            value={actualAccount?.name}
            onPress={() => navigate('EditAccountNameScreen')}
          />
        )
        : (
          <RowInfo 
            label='Nombre'
            value={actualAccount?.name || ''}
          />
        )
      }
      <RowInfoPressable
        label='Usuarios'
        value={`${actualAccount?.users?.length}/${actualAccount?.max_num_users}`}
        onPress={() => navigate('UsersInAccountScreen')}
      />
      <RowInfo
        label='Creador'
        value={actualAccount?.creator_user?.fullName || ''}
      />
      <RowInfo
        label='Administrador'
        value={actualAccount?.admin_user?.fullName || ''}
      />
      <RowInfoPressable
        label='Clave de acceso'
        value='········'
        onPress={() => navigate('AccessKeyScreen')}
      />
      <RowInfoPressable
        label='Categorías'
        value=''
        onPress={() => navigate('CategoriesListScreen')}
      />
      <RowInfoPressable
        label='Gastos en cuotas'
        value=''
        onPress={() => navigate('CreditExpensesScreen')}
      />
      <DataDescription description={actualAccount?.description || ''} />

    </InfoListContainer>
  )
}