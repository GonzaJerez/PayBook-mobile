import {TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[];
  onPress: ()=>void
}

export const PopupOption = ({children, onPress}:Props) => {
  return (
    <TouchableOpacity 
      style={styles.optionsPopupRow}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  optionsPopupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 15,
    marginVertical: 10
  },
})