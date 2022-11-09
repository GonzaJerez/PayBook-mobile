import React, {useContext} from 'react'
import {Text, StyleSheet} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  label: string;
}

export const DefaultLabel = ({label}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <Text
      style={{...styles.label, color: theme.ligthText}}>
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  label: {
    width:'40%'
  },
})