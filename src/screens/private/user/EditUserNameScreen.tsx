import React, {useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import {EditName} from '../../../components/form/EditName'
import {AuthContext} from '../../../context/auth/AuthContext'

export const EditUserNameScreen = () => {

  const {user, updateUser} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <EditName 
        label='usuario'
        initialValue={user?.fullName || ''}
        onSubmit={updateUser}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})