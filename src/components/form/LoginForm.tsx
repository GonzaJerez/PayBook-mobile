import React from 'react'
import {View, StyleSheet} from 'react-native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {GoogleButton} from '../buttons/GoogleButton'
import {DefaultSeparator} from '../separators/DefaultSeparator'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {LoginFields} from './LoginFields'

interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator,any>
}

export const LoginForm = ({navigation}:Props) => {

  return (
    <View style={styles.container}>
      <GoogleButton />
      <DefaultSeparator />

      <LoginFields />

      <TertiaryButton 
        label='Olvidé mi contraseña' 
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        style={styles.forgotPassButton}
        fontSize={14}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:120
  },
  fields:{
    marginBottom:20
  },
  forgotPassButton:{
    marginBottom:0,
  }
})