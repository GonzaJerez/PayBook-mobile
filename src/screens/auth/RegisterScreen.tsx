import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import {QuestionToNavigate} from '../../components/buttons/QuestionToNavigate'
import {RegisterForm} from '../../components/form/RegisterForm'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {HeaderBrand} from '../../components/brand/HeaderBrand'

interface Props extends NativeStackScreenProps<AuthStackNavigator,'RegisterScreen'>{}

export const RegisterScreen = ({navigation}:Props) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >

      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        
        <HeaderBrand size='big' style={styles.title}/>
          
        <RegisterForm />

        <QuestionToNavigate 
          label='¿Ya estás registrado?' 
          navigateTo='LoginScreen' 
          navigation={navigation}
        />

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:30,
  },
  title:{
    marginBottom:60,
    marginTop:50,
    alignSelf:'flex-start'
  },
})