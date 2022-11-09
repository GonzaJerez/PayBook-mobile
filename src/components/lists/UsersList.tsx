import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {AccountsContext} from '../../context/accounts/AccountsContext'

import {UserRow} from '../item-lists/UserRow'


interface Props {
  usersSelectedToDelete: string[];
  setUsersSelectedToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

export const UsersList = ({usersSelectedToDelete, setUsersSelectedToDelete}: Props) => {

  const {actualAccount} = useContext(AccountsContext)

  return (
    <View style={styles.container}>
      {actualAccount?.users
        .filter(user => !usersSelectedToDelete.includes(user.id))
        .map(user => (
          <UserRow
            key={user.id}
            userInAccount={user}
            setUsersSelectedToDelete={setUsersSelectedToDelete}
          />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
})