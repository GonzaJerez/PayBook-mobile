import React, {useContext} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {AccountsContext} from '../../../context/accounts/AccountsContext'
import {ThemeContext} from '../../../context/theme/ThemeContext'

export const AccessKeyScreen = () => {

  const {theme} = useContext(ThemeContext)
  const {actualAccount} = useContext(AccountsContext)

  return (
    <View style={styles.container}>
      <View style={styles.accessKeyContainer}>
        <Text style={[styles.accessKey,{color:theme.colors.text, borderColor:theme.colors.border}]}>{actualAccount?.access_key}</Text>
        <Text style={[styles.infoText, {color: theme.ligthText}]}>Comparte esta clave de acceso con los usuarios que desees que ingresen a esta cuenta.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  accessKeyContainer: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 40
  },
  accessKey: {
    fontSize: 40,
    borderWidth: 1,
    padding: 15,
    borderRadius: 5
  },
  infoText: {
    marginTop: 40,
    textAlign: 'center'
  }
})