import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  description: string;
}

export const DataDescription = ({description}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={styles.descriptionContainer}>
      <Text style={[styles.label, {color: theme.colors.text}]}>Descripcion:</Text>
      <Text style={[styles.description, {color: theme.ligthText}]}>
        {description}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer:{
    alignItems:'center',
    paddingHorizontal:40,
    marginTop:20
  },
  label:{
    fontSize:20,
    fontWeight: '500'
  },
  description:{
    marginTop:20,
    fontSize:16,
    textAlign:'justify'
  }
})