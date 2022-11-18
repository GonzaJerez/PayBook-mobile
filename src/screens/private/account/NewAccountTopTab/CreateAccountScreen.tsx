import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import {CreateAccountForm} from '../../../../components/form/CreateAccountForm'


export const CreateAccountScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <CreateAccountForm />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})