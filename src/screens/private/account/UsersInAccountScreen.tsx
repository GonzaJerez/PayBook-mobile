import React, {useContext, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackScreenProps} from '@react-navigation/native-stack'

import {UsersList} from '../../../components/lists/UsersList'
import {SubmitOrCancelButtons} from '../../../components/buttons/SubmitOrCancelButtons'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {ValidRoles} from '../../../interfaces/ValidRoles'
import {RowInfo} from '../../../components/item-lists/RowInfo'
import {SimplePicker} from '../../../components/fields/SimplePicker'
import {AccountsContext} from '../../../context/accounts/AccountsContext'
import {AuthContext} from '../../../context/auth/AuthContext'
import {getRange} from '../../../helpers/getRange'
import {ErrorRequest} from '../../../components/texts/ErrorRequest'


interface Props extends NativeStackScreenProps<AccountStackNavigation, 'UsersInAccountScreen'> {}

export const UsersInAccountScreen = ({navigation}: Props) => {

  const {actualAccount, isLoading, updateUsersInAccount} = useContext(AccountsContext)
  const {user} = useContext(AuthContext)

  const [error, setError] = useState<string>()
  const [usersSelectedToDelete, setUsersSelectedToDelete] = useState<string[]>([])
  const [maxUsersSelected, setMaxUsersSelected] = useState(String(actualAccount?.max_num_users) || '1')

  const maxUsers = getRange(10, 10 - (actualAccount?.users.length || 0) - usersSelectedToDelete.length)

  const updateAccount = async()=>{
    const hasError = await updateUsersInAccount({max_num_users: +maxUsersSelected},usersSelectedToDelete)
    if(hasError){
      setError(hasError)
    } else {
      navigation.goBack()
    }
  }

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

        {(error) && (<ErrorRequest>{error}</ErrorRequest>)}

        {(user?.roles.includes(ValidRoles.ADMIN) || actualAccount?.admin_user.id === user?.id)
        && (
          <SubmitOrCancelButtons 
            onCancel={()=>navigation.goBack()}
            onSubmit={updateAccount}
            isLoading={isLoading}
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