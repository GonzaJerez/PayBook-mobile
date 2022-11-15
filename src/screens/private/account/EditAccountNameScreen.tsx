import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {EditNameField} from '../../../components/form/EditNameField'
import {AccountsContext} from '../../../context/accounts/AccountsContext'

export const EditAccountNameScreen = () => {

  const {actualAccount, isLoading, updateAccount} = useContext(AccountsContext)
  
  return (
    <View style={styles.container}>
      <EditNameField 
        label='cuenta'
        initialValue={actualAccount?.name || ''}
        onSubmit={updateAccount}
        isLoading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})