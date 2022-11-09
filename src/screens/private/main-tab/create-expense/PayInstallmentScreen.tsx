import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import {HeaderBrand} from '../../../../components/brand/HeaderBrand'
import {PayInstallmentForm} from '../../../../components/form/PayInstallmentForm'

export const PayInstallmentScreen = () => {
  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>

        <HeaderBrand />
        
        <PayInstallmentForm />

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex:1
  }
})