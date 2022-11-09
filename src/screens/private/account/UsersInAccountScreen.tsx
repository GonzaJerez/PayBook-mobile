import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {UsersList} from '../../../components/lists/UsersList'
import {SubmitOrCancelButtons} from '../../../components/buttons/SubmitOrCancelButtons'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {ValidRoles} from '../../../interfaces/ValidRoles'
import {RowInfo} from '../../../components/item-lists/RowInfo'
import {SimplePicker} from '../../../components/fields/SimplePicker'
import {useUsersInAccount} from '../../../hooks/useUsersInAccount'


interface Props extends NativeStackScreenProps<AccountStackNavigation, 'UsersInAccountScreen'> {}

export const UsersInAccountScreen = ({navigation}: Props) => {

  const {
    actualAccount,
    maxUsers,
    user,
    maxUsersSelected,
    usersSelectedToDelete,
    setMaxUsersSelected,
    setUsersSelectedToDelete,
    updateAccount
  } = useUsersInAccount({navigation})

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        {(user?.roles.includes(ValidRoles.ADMIN) || actualAccount?.admin_user.id === user?.id)
          ? (
            <SimplePicker
              label='Máximos usuarios'
              options={maxUsers}
              initialValue={maxUsersSelected}
              onChange={setMaxUsersSelected}
            />
          )
          : (
            <RowInfo
              label='Máximos usuarios'
              value='2'
            />
          )
        }
        <UsersList 
          usersSelectedToDelete={usersSelectedToDelete}
          setUsersSelectedToDelete={setUsersSelectedToDelete}
        />

        {(user?.roles.includes(ValidRoles.ADMIN) || actualAccount?.admin_user.id === user?.id)
        && (
          <SubmitOrCancelButtons 
            onCancel={()=>navigation.goBack()}
            onSubmit={updateAccount}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30
  },
  dataContainer:{
    marginTop:30
  }
})