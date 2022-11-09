import {Text, ActivityIndicator, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  label: string;
}

export const WaitingResultStatus = ({label}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <>
      <Text style={[styles.label, {color:theme.colors.text}]}>{label}</Text>
      <ActivityIndicator 
        color={theme.colors.primary}
      />
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize:16,
    fontWeight:'500'
  }
})