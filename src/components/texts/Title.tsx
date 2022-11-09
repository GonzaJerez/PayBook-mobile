import React, {useContext} from 'react'
import { Text, StyleSheet, TextStyle } from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
    label:  string;
    size?:  'small' | 'medium' | 'big';
    style?: TextStyle | TextStyle[];
}

export const Title = ({label, size='medium', style}:Props) => {

  const {theme} = useContext(ThemeContext)

    let fontSize = 20;
    if (size === 'small') fontSize = 16
    if (size === 'big') fontSize = 30


  return (
    <Text style={[styles.title, {fontSize, color:theme.ligthText}, style ]}>{label}</Text>
  )
}

const styles = StyleSheet.create({

  title: {
    fontWeight: '600',
    marginBottom: 50,
    letterSpacing:0.2
  },
})