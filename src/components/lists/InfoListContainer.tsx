import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


interface Props {
  children: JSX.Element | JSX.Element[]
}

export const InfoListContainer = ({children}:Props) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
  }
})