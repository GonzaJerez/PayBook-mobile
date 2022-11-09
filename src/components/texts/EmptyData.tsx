import React, {useContext} from 'react'
import { View, Text, StyleSheet } from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  text: string;
}

export const EmptyData = ({text}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={styles.container}>
      <Text style={{color:theme.ligthText}}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf:'center',
    marginVertical:20
  }
})