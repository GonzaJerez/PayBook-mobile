import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {DefaultLabel} from './DefaultLabel'


interface Props {
  label: string;
  value: string;
}

export const InlineFixedValue = ({label, value}:Props) => {
  return (
    <View style={styles.container}>
      <DefaultLabel label={label}/>
      <Text style={styles.value}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:10
  },
  value:{
    fontSize: 16,
    marginRight:20
  }
})