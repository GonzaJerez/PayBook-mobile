import React, {useContext} from 'react'
import { Text, StyleSheet } from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  children: string;
}

export const ErrorRequest = ({children}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
      <Text style={[styles.textError, {color:theme.delete}]}>
        {children}
      </Text>
  )
}
const styles = StyleSheet.create({
  textError: {
    marginBottom:20,
    textAlign:'center'
  }
})