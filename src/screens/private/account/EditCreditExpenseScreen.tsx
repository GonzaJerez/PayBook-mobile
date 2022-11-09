import React from 'react'
import { View, StyleSheet } from 'react-native'

import {EditCreditExpenseForm} from '../../../components/form/EditCreditExpenseForm'

export const EditCreditExpenseScreen = () => {
  return (
    <View style={styles.container}>
      <EditCreditExpenseForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginHorizontal:20,
    marginTop:50
  }
})