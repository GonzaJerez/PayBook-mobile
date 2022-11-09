import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {PasswordField} from './PasswordField'
import {PrimaryButton} from '../buttons/PrimaryButton'
import {AuthContext} from '../../context/auth/AuthContext'
import {ErrorRequest} from '../texts/ErrorRequest'
import {RequestsStatusContext} from '../../context/requests-status/RequestsStatusContext'

export const RegisterFields = () => {

  const {isLoading} = useContext(RequestsStatusContext)
  const {error, register} = useContext(AuthContext)

  return (
    <Formik
      initialValues={{
        fullName: '',
        email1: '',
        email2: '',
        password1: '',
        password2: ''
      }}
      onSubmit={(values) => register(values)}
      validationSchema={
        Yup.object({
          fullName: Yup
            .string()
            .max(30, 'El nombre no puede tener más de 30 caracteres')
            .min(1, 'El nombre es requerido')
            .required('El nombre es requerido'),
          email1: Yup
            .string()
            .email('Email no válido')
            .required('El email es requerido'),
          email2: Yup
            .string()
            .required()
            .oneOf([Yup.ref('email1')], 'Los emails no coinciden'),
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
      {
        ({handleSubmit, errors, touched}) => (
          <>
            <View style={styles.container}>
              <Field
                label='Nombre completo'
                placeholder='Germán Gonzalez'
                name='fullName'
              />
              <Field
                label='Email'
                placeholder='email_ejemplo@gmail.com'
                type='email-address'
                name='email1'
              />
              <Field
                label='Confirmar email'
                placeholder='email_ejemplo@gmail.com'
                type='email-address'
                name='email2'
              />
              <PasswordField
                label='Contraseña'
                placeholder='········'
                name='password1'
              />
              <PasswordField
                label='Confirmar contraseña'
                placeholder='········'
                name='password2'
              />
            </View>

            {(error) && (
              <ErrorRequest>{error}</ErrorRequest>
            )}

            <PrimaryButton 
              label='Registrarme' 
              onPress={handleSubmit}
              isLoading={isLoading}
              disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
            />
          </>

        )
      }
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  }
})