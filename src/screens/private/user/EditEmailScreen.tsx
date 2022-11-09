import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import {EditEmailForm} from '../../../components/form/EditEmailForm'

export const EditEmailScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <EditEmailForm />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1
  }
})