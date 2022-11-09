import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {EditName} from '../../../components/form/EditName'
import {AccountsContext} from '../../../context/accounts/AccountsContext'

export const EditAccountNameScreen = () => {

  const {actualAccount, updateAccount} = useContext(AccountsContext)
  
  return (
    <View style={styles.container}>
      <EditName 
        label='cuenta'
        initialValue={actualAccount?.name || ''}
        onSubmit={updateAccount}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})