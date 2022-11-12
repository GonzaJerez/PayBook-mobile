import React, {useContext} from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {DisableText} from '../texts/DisableText'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {useRecoveryAccount} from '../../hooks/useRecoveryAccount'
import {ErrorRequest} from '../texts/ErrorRequest'
import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator, 'ForgotPasswordScreen'>
}

export const ForgotPasswordForm = ({navigation}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {passwordRecovery, error, isLoading} = useRecoveryAccount()

  const onSubmit = async(email:string)=>{
    const res = await passwordRecovery(email);
    if(!res?.error)
      navigation.navigate('ConfirmCodeEmailScreen', {email})
  }

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      onSubmit={({email})=>onSubmit(email)}
      validationSchema={
        Yup.object({
          email: Yup
            .string()
            .email('Email no válido')
            .required('El email es requerido'),
        })
      }
    >
      {
        ({handleSubmit,errors, touched}) => (
          <>
          {(isLoading) && (
              <ActivityIndicator 
                size={30}
                color={theme.colors.primary}
                style={styles.loadingSpinner}
              />
            )}
            <Field
              placeholder='email_ejemplo@gmail.com'
              type='email-address'
              name='email'
            />

            <DisableText>Se enviará un código de recuperación a su email para validar el usuario.</DisableText>

            <TertiaryButton
              label='Enviar email'
              onPress={handleSubmit}
              style={styles.submitButton}
              disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0 || isLoading)}
            />
            {(error) && (
              <ErrorRequest>{error}</ErrorRequest>
            )}
          </>
        )
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  loadingSpinner:{
    marginBottom:10
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: 60
  }
})