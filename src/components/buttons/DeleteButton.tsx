import {Ionicons} from '@expo/vector-icons';
import React, {useContext} from 'react'
import {Text, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  label?: string;
  fontSize?: number;
  style?: ViewStyle;
  onPress: () => void;
}

export const DeleteButton = ({label, fontSize, style, onPress}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <TouchableOpacity
      style={[styles.container, {...style}]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.textButton,
          {color: theme.delete, fontSize}
        ]}
      >
        {label}
      </Text>
      <Ionicons 
        name='trash-outline'
        size={20}
        color={theme.delete}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    flexDirection:'row',
    alignItems:'center'
  },
  textButton: {
    fontSize: 16,
    marginRight:5
  }
})