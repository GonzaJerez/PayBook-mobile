import {View, Text, StyleSheet, Button, ViewStyle, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useContext} from 'react'
import {ThemeContext} from '../../context/theme/ThemeContext'

interface Props {
  label: string;
  style?: ViewStyle;
  isLoading?: boolean;
  disable?: boolean
  onPress: () => void;
}

export const PrimaryButton = ({label, style, isLoading, disable, onPress}: Props) => {
  
  const {theme: {colors}} = useContext(ThemeContext)

  return (
    <View style={{...styles.container, ...style}}>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          {
            backgroundColor: colors.primary,
            opacity: (disable) ? 0.7 : 1
          }
        ]}
        onPress={onPress}
        disabled={(disable || isLoading)}
      >
        {(isLoading)
          ? (<ActivityIndicator color={colors.background} />)
          : (
            <Text
              style={[styles.textButton, {color: colors.background}]}
            >
              {label}
            </Text>
          )
        }
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  primaryButton: {
    height: 40,
    paddingHorizontal:15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 16,
    fontWeight: '400',
  }
})
