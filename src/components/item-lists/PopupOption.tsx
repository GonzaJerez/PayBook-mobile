import {TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

interface Props {
  children: JSX.Element | JSX.Element[];
  onPress: ()=>void;
  disabled?: boolean;
}

export const PopupOption = ({children, disabled, onPress}:Props) => {
  return (
    <TouchableOpacity 
      style={styles.optionsPopupRow}
      onPress={onPress}
      disabled={disabled}
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