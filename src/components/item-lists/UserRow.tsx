import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {DeleteButton} from '../buttons/DeleteButton'
import {AuthContext} from '../../context/auth/AuthContext'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {ValidRoles} from '../../interfaces/ValidRoles'
import {User} from '../../interfaces/User'
import {useAlertToConfirm} from '../../hooks/useAlertToConfirm'


interface Props {
  userInAccount: User;
  setUsersSelectedToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export const UserRow = ({userInAccount, setUsersSelectedToDelete}:Props) => {

  const {theme} = useContext(ThemeContext)
  const {user} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)

  const {showAlert} = useAlertToConfirm({
    title: 'Eliminar usuario',
    message: '¿Seguro que deseas eliminar este usuario de la cuenta?',
    onCancel: ()=>{},
    onConfirm: ()=>setUsersSelectedToDelete(prev => ([...prev, userInAccount.id])),
    textToConfirm: 'Eliminar'
  })

  return (
    <View style={[styles.userContainer, {borderColor: theme.disable}]}>

      <View style={styles.userDataContainer}>
        <Text style={[styles.userName, {color:theme.colors.text}]}>{userInAccount.fullName}</Text>
        <Text style={[styles.userEmail, {color: theme.disable}]}>{userInAccount.email}</Text>
      </View>

      {(user?.roles.includes(ValidRoles.ADMIN) || actualAccount?.admin_user.id === user?.id) && (
        <DeleteButton onPress={showAlert}/>
      )}

    </View>
  )
}


const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  userDataContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  userName: {
    fontSize: 20,
    marginRight: 10
  },
  userEmail: {

  },
  buttonsContainer: {
    marginLeft: 20
  }
})