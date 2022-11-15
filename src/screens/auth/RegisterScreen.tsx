import React from 'react'
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'

import {QuestionToNavigate} from '../../components/buttons/QuestionToNavigate'
import {RegisterForm} from '../../components/form/RegisterForm'
import {HeaderBrand} from '../../components/brand/HeaderBrand'


export const RegisterScreen = () => {

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