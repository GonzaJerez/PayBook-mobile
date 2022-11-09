import React, {useContext} from 'react'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import { View, Text, StyleSheet, Dimensions } from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {TertiaryButton} from './TertiaryButton'
import {AuthContext} from '../../context/auth/AuthContext'


interface Props {
  label:  string;
  navigateTo: keyof AuthStackNavigator;
  navigation: NativeStackNavigationProp<AuthStackNavigator, any>
}

export const QuestionToNavigate = ({label, navigation, navigateTo}:Props) => {
  
  const {theme} = useContext(ThemeContext)
  const {cleanErrors} = useContext(AuthContext)

  const changeScreen = ()=>{
    navigation.navigate(navigateTo)
    cleanErrors()
  }

  return (
    <View style={styles.container}>

      <Text 
        style={{color:theme.ligthText}}>
          {label}
      </Text>

      <TertiaryButton 
        style={{marginVertical:0}} 
        onPress={changeScreen}
        fontSize={14}
        label={
          navigateTo === 'RegisterScreen'
            ? 'Crear una cuenta'
            : 'Ingresá con tu cuenta'
          }
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    alignSelf:'center',
    marginVertical: 30
  }
})