import React, {useContext, useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {PasswordField} from './PasswordField'
import {PrimaryButton} from '../buttons/PrimaryButton'
import {AuthContext} from '../../context/auth/AuthContext'
import {ErrorRequest} from '../texts/ErrorRequest'
import {LoginUser} from '../../interfaces/Auth'

export const LoginFields = () => {

  const {login, isLoading} = useContext(AuthContext)

  const [error, setError] = useState<string>()

  const onLogin = async(values:LoginUser)=>{
    const errorMessage = await login(values)
    if(errorMessage){
      setError(errorMessage)
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      onSubmit={onLogin}
      validationSchema={
        Yup.object({
          email: Yup
            .string()
            .email('Email no válido')
            .required('El email es requerido'),
          password: Yup
            .string()
            .min(8,'La contraseña debe tener mínimo 8 caracteres')
            .required('La contraseña es obligatoria')
        })
      }
    >
      {
        ({handleSubmit, errors, touched}) => (
          <>
            <View style={styles.fields}>
              <Field 
                label='Email' 
                placeholder='email_prueba@gmail.com' 
                type='email-address'
                name='email'
              />
              <PasswordField 
                label='Contraseña' 
                placeholder='········'
                name='password'
              />
            </View>
            
            {(error) && (
              <ErrorRequest>{error}</ErrorRequest>
            )}

            <PrimaryButton 
              label='Ingresar' 
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
  fields: {
    marginBottom: 20
  },
})