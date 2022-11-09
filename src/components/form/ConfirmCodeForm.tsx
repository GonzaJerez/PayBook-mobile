import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {BigInput} from './BigInput'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator, 'ConfirmCodeEmailScreen'>
}

export const ConfirmCodeForm = ({navigation}:Props) => {
  return (
    <Formik
      initialValues={{
        securityCode: ''
      }}
      onSubmit={() => navigation.navigate('UpdatePasswordScreen')}
      validationSchema={
        Yup.object({
          securityCode: Yup
            .string()
            .length(8, 'El código de seguridad no tiene los caracteres necesarios')
            .required('El código de seguridad es requerido')
        })
      }
    >
      {
        ({handleSubmit, errors, touched}) => (
          <>
            <BigInput 
              label='Ingrese el código de seguridad que recibio por email' 
              type='number-pad'
              name='securityCode'
            />
            <TertiaryButton 
              label='Confirmar' 
              onPress={handleSubmit}
              disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
            />
          </>
        )
      }
    </Formik>
  )
}
