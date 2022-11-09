import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {ThemeContext} from '../../context/theme/ThemeContext'

interface Props {
  label: string;
  value: string;
  borderBottom?: boolean
}

export const RowInfo = ({label, value, borderBottom}: Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <View
      style={[
        styles.rowContainer,
        {
          borderColor: theme.colors.border,
          borderBottomWidth: (borderBottom) ? 1 : 0
        }
      ]}
    >
      <Text
        style={[styles.label, {color: theme.colors.text}]}
      >
        {label}:
      </Text>
      <Text style={[styles.value, {color: theme.ligthText}]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 40,
    alignItems:'center'
  },
  label: {
    fontSize: 20,
    fontWeight: '500'
  },
  value: {
    fontSize: 20,
    fontWeight: '500'
  },
})
