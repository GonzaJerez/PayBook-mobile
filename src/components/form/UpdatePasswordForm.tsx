import {StyleSheet} from 'react-native'
import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {PasswordField} from './PasswordField'
import {PrimaryButton} from '../buttons/PrimaryButton'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator, 'UpdatePasswordScreen'>
}

export const UpdatePasswordForm = ({navigation}:Props) => {
  return (
    <Formik
      initialValues={{
        password1: '',
        password2: ''
      }}
      onSubmit={() => navigation.navigate('LoginScreen')}
      validationSchema={
        Yup.object({
          password1: Yup
            .string()
            .min(8, 'La contraseña debe tener mínimo 8 caracteres')
            .required('La contraseña es obligatoria'),
          password2: Yup
            .string()
            .required()
            .oneOf([Yup.ref('password1')], 'Las contraseñas no coinciden')
        })
      }
    >
      {({handleSubmit,errors,touched}) => (
        <>
          <PasswordField
            label='Ingrese una nueva contraseña'
            placeholder='········'
            name='password1'
          />
          <PasswordField
            label='Confirme la contraseña'
            placeholder='········'
            name='password2'
          />
          <PrimaryButton
            label='Confirmar cambio'
            style={styles.submitButton}
            onPress={handleSubmit}
            disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
          />
        </>
      )}

    </Formik>
  )
}

const styles = StyleSheet.create({
  submitButton:{
    marginTop:30
  }
})