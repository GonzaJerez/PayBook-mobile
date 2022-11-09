import Constants from 'expo-constants';
import React, {useContext} from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  size?: 'small' | 'medium' | 'big';
  style?: ViewStyle
}

const NAME_APP = Constants?.manifest?.name

export const HeaderBrand = ({size, style}:Props) => {

  const {theme} = useContext(ThemeContext)

  let fontSize = 24;
  if(size === 'small') fontSize = 18
  if(size === 'big') fontSize = 28

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.text, {color:theme.colors.text, fontSize}]}>{NAME_APP}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf:'center',
  },
  text:{
    fontWeight: '600',
  }
})