import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {UserButton} from './UserButton'
import {AccountInfoButton} from './AccountInfoButton'

export const RightHeader = () => {
  return (
    <View style={styles.container}>
      <AccountInfoButton />
      <UserButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    right: 15
  }
})