import React from 'react'
import {StyleSheet} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {DisableText} from '../texts/DisableText'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator, 'ForgotPasswordScreen'>
}

export const ForgotPasswordForm = ({navigation}: Props) => {

  return (
    <Formik
      initialValues={{
        email: ''
      }}
      onSubmit={()=>navigation.navigate('ConfirmCodeEmailScreen')}
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
            <Field
              placeholder='email_ejemplo@gmail.com'
              type='email-address'
              name='email'
            />

            <DisableText>Se enviará un código de recuperación a su email para validar el usuario</DisableText>

            <TertiaryButton
              label='Enviar email'
              onPress={handleSubmit}
              style={styles.submitButton}
              disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
            />
          </>
        )
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    marginTop: 60
  }
})