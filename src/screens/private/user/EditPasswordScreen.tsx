import { StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'
import {EditPasswordForm} from '../../../components/form/EditPasswordForm'

export const EditPasswordScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <EditPasswordForm />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})