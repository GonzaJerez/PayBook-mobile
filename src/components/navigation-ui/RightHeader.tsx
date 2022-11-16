import {View, Text, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import {UserButton} from './UserButton'
import {AccountInfoButton} from './AccountInfoButton'
import {AccountsContext} from '../../context/accounts/AccountsContext'

export const RightHeader = () => {

  const {actualAccount} = useContext(AccountsContext)

  return (
    <View style={styles.container}>
      {(actualAccount) && (
        <AccountInfoButton />
      )}
      <UserButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    right: 15
  }
})