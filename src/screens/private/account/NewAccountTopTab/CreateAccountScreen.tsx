import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import {CreateAccountForm} from '../../../../components/form/CreateAccountForm'
import {NewAccountTopTabNavigation} from '../../../../navigation/NewAccountTopTab'

interface Props extends NativeStackScreenProps<NewAccountTopTabNavigation,'CreateAccountScreen'>{}

export const CreateAccountScreen = ({navigation}:Props) => {
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