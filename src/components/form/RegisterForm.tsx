import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {RegisterFields} from './RegisterFields'


export const RegisterForm = () => {
  return (
    <View style={styles.container}>

      <RegisterFields />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
})