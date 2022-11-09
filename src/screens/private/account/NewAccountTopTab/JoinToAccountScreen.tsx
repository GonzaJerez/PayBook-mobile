import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {JoinAccountForm} from '../../../../components/form/JoinAccountForm'

export const JoinToAccountScreen = () => {
  return (
    <View style={styles.container}>
      <JoinAccountForm />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})