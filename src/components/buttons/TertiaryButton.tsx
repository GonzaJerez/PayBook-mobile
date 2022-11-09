import React, {useContext} from 'react'
import {Text, TouchableOpacity, StyleSheet, ViewStyle} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  label:      string;
  fontSize?:  number;
  style?:     ViewStyle;
  disable?:   boolean;
  onPress:    () => void;
}

export const TertiaryButton = ({label, fontSize, style, disable, onPress}: Props) => {

  const {theme: {colors}} = useContext(ThemeContext)

  return (
    <TouchableOpacity
      style={[styles.container, {
        opacity: (disable) ? 0.7 : 1,
        ...style
      }]}
      onPress={onPress}
      disabled={disable}
    >
      <Text
        style={[
          styles.textButton,
          {color: colors.primary, fontSize}
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    height: 30,
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 16,
    fontWeight: '500'
  }
})