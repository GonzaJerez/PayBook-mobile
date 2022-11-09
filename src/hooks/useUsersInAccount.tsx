import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useContext, useState} from 'react'
import {AccountsContext} from '../context/accounts/AccountsContext'
import {AuthContext} from '../context/auth/AuthContext'
import {getRange} from '../helpers/getRange'
import {AccountStackNavigation} from '../navigation/AccountNavigation'


interface Props {
  navigation: NativeStackNavigationProp<AccountStackNavigation, 'UsersInAccountScreen', undefined>
}

export const useUsersInAccount = ({navigation}:Props)=>{

  const {actualAccount, updateUsersInAccount} = useContext(AccountsContext)
  const {user} = useContext(AuthContext)

  const [usersSelectedToDelete, setUsersSelectedToDelete] = useState<string[]>([])
  const [maxUsersSelected, setMaxUsersSelected] = useState(String(actualAccount?.max_num_users) || '1')

  const maxUsers = getRange(10, 10 - (actualAccount?.users.length || 0) - usersSelectedToDelete.length)

  const updateAccount = ()=>{
    navigation.goBack()
    updateUsersInAccount({max_num_users: +maxUsersSelected},usersSelectedToDelete)
  }

  return {
    actualAccount,
    user,
    maxUsers,
    usersSelectedToDelete,
    setUsersSelectedToDelete,
    maxUsersSelected,
    setMaxUsersSelected,
    updateAccount
  }
}