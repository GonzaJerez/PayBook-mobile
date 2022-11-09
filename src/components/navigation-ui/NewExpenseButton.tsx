import {View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent} from 'react-native'
import React, {useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  onPress: ((e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent) => void) | undefined
}

export const NewExpenseButton = ({onPress}:Props) => {

  const {theme} = useContext(ThemeContext)

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.containerNewExpense, {backgroundColor: theme.colors.primary, shadowColor:theme.shadow}]}>
        <Ionicons
          name="add-outline"
          size={55}
          color={theme.colors.background}
          style={styles.iconNewExpense}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerNewExpense: {
    top: -35,
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5
  },
  iconNewExpense: {
    backgroundColor: 'fff',
    borderRadius: 100,
    position: 'absolute',
    paddingLeft: 4,
  }
})