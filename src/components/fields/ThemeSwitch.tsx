import React, {useContext} from 'react'
import {View, Text, Switch, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {ThemeContext} from '../../context/theme/ThemeContext'

export const ThemeSwitch = () => {

  const {theme, setDarkTheme, setLightTheme} = useContext(ThemeContext)

  const onChangeTheme = () => {
    (theme.dark)
      ? setLightTheme()
      : setDarkTheme()
  }

  return (
    <View style={styles.switchContainer}>
      <Text style={[styles.label, {color:theme.ligthText}]}>Tema</Text>
      <Ionicons
        name='sunny-outline'
        size={16}
        color={!theme.dark ? theme.colors.primary : theme.ligthText}
      />
      <Switch
        trackColor={{false: theme.ligthText, true: theme.colors.primary}}
        thumbColor='#fff'
        // ios_backgroundColor="#3e3e3e"
        onValueChange={onChangeTheme}
        value={theme.dark}
        style={styles.switch}
      />
      <Ionicons
        name='moon-outline'
        size={16}
        color={theme.dark ? theme.colors.primary : theme.ligthText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 20
  },
  label: {
    marginRight: 20
  },
  switch:{
    marginHorizontal:5
  }
})