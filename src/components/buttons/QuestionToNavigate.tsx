import React, {useContext} from 'react'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import { View, Text, StyleSheet } from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {TertiaryButton} from './TertiaryButton'
import {useNavigation} from '@react-navigation/native'


interface Props {
  label:  string;
  navigateTo: 'LoginScreen' | 'RegisterScreen';
}

export const QuestionToNavigate = ({label, navigateTo}:Props) => {
  
  const {theme} = useContext(ThemeContext)

  const {navigate} = useNavigation<NativeStackNavigationProp<AuthStackNavigator>>()

  const changeScreen = ()=>{
    navigate(navigateTo)
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