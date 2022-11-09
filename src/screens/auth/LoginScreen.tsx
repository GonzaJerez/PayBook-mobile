import {NativeStackScreenProps} from '@react-navigation/native-stack'
import React from 'react'
import {StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions} from 'react-native'
import {FooterBrand} from '../../components/brand/FooterBrand'
import {HeaderBrand} from '../../components/brand/HeaderBrand'

import {QuestionToNavigate} from '../../components/buttons/QuestionToNavigate'
import {LoginForm} from '../../components/form/LoginForm'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'


interface Props extends NativeStackScreenProps<AuthStackNavigator,'LoginScreen'>{}

export const LoginScreen = ({navigation}:Props) => {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* <HeaderBrand size='big' style={styles.title}/> */}

        <LoginForm navigation={navigation}/>

        <QuestionToNavigate 
          label='¿Todavía no estás registrado?' 
          navigateTo='RegisterScreen' 
          navigation={navigation}
        />

      </ScrollView>

      <FooterBrand />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal:30,
  },
  title:{
    alignSelf:'flex-start',
    marginBottom:70,
    marginTop:50
  },
})