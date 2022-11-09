import React, {useContext} from 'react'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {InfoListContainer} from './InfoListContainer'
import {RowInfoPressable} from '../item-lists/RowInfoPressable'
import {DefaultSeparator} from '../separators/DefaultSeparator'
import {UserStackNavigation} from '../../navigation/UserNavigation'
import {AuthContext} from '../../context/auth/AuthContext'
import {ValidRoles} from '../../interfaces/ValidRoles'
import {useAlertToConfirm} from '../../hooks/useAlertToConfirm'
import {ThemeSwitch} from '../fields/ThemeSwitch'
import {RowInfo} from '../item-lists/RowInfo'

export const UserProfile = () => {

  const {user, logout, deleteUser} = useContext(AuthContext)

  const {navigate} = useNavigation<NativeStackNavigationProp<UserStackNavigation>>()

  const {showAlert: showAlertLogout} = useAlertToConfirm({
    title: 'Cerrar sesión',
    message: '¿Estás seguro que deseas abandonar la sesión?',
    onCancel: () => {},
    onConfirm: logout,
    textToConfirm: 'Cerrar sesión'
  })

  const {showAlert: showAlertDelete} = useAlertToConfirm({
    title: 'Eliminar usuario',
    message: '¿Estás seguro que deseas eliminar esta cuenta de usuario? \n\nEsta opción no es reversible',
    onCancel: () => {},
    onConfirm: deleteUser,
    textToConfirm: 'Eliminar cuenta'
  })

  return (
    <InfoListContainer>
      <ThemeSwitch />
      {(user?.google)
        ? (
          <>
            <RowInfo
              label='Nombre'
              value={user.fullName}
            />
            <RowInfo
              label='Email'
              value={user?.email}
            />
            <RowInfo
              label='Contraseña'
              value='········'
            />
          </>
        )
        : (
          <>
            <RowInfoPressable
              label='Nombre'
              value={user?.fullName}
              onPress={() => navigate('EditUserNameScreen')}
              borderBottom
            />
            <RowInfoPressable
              label='Email'
              value={user?.email}
              onPress={() => navigate('EditEmailScreen')}
              borderBottom
            />
            <RowInfoPressable
              label='Contraseña'
              value='········'
              onPress={() => navigate('EditPasswordScreen')}
              borderBottom
            />
          </>
        )}
        <RowInfoPressable
          label='Premium'
          value={user?.roles.includes(ValidRoles.USER_PREMIUM) ? 'Sí' : 'No'}
          onPress={() => navigate('SuscriptionNavigation', {screen: 'SuscriptionScreen'})}
          borderBottom
        />

      <DefaultSeparator />

      <RowInfoPressable
        label='Cerrar sesión'
        value=''
        onPress={showAlertLogout}
        borderBottom
      />
      <RowInfoPressable
        label='Eliminar cuenta'
        value=''
        onPress={showAlertDelete}
        borderBottom
      />

    </InfoListContainer>
  )
}

