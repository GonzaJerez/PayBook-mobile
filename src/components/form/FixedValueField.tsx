import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext';

interface Props {
  label?: string;
  fixedValue?: string;
}

export const FixedValue = ({label, fixedValue}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View style={styles.container}>

      {(label) && (
        <Text
          style={{...styles.label, color: theme.ligthText}}>
          {label}
        </Text>
      )}

      <Text
        style={[styles.input, {borderColor: theme.colors.border, color: theme.disable}]}
      >
        {fixedValue}
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
})