import React, {useContext} from 'react'
import { View, StyleSheet } from 'react-native'
import {EditNameField} from '../../../components/form/EditNameField'
import {AuthContext} from '../../../context/auth/AuthContext'

export const EditUserNameScreen = () => {

  const {user, isLoading, updateUser} = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <EditNameField 
        label='usuario'
        initialValue={user?.fullName || ''}
        onSubmit={updateUser}
        isLoading={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})