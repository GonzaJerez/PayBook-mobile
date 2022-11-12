import React, {useContext, useEffect, useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {BigInput} from './BigInput'
import {TertiaryButton} from '../buttons/TertiaryButton'
import {AuthStackNavigator} from '../../navigation/AuthNavigation'
import {useRecoveryAccount} from '../../hooks/useRecoveryAccount'
import {ErrorRequest} from '../texts/ErrorRequest'
import {ActivityIndicator, StyleSheet, Text} from 'react-native'
import {ThemeContext} from '../../context/theme/ThemeContext'


interface Props {
  navigation: NativeStackNavigationProp<AuthStackNavigator, 'ConfirmCodeEmailScreen'>;
  email: string;
}

export const ConfirmCodeForm = ({navigation, email}:Props) => {

  const {theme} = useContext(ThemeContext)
  const {validateSecurityCode, passwordRecovery, error, isLoading} = useRecoveryAccount()
  const [timer, setTimer] = useState(60)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const initTimer = ()=>{
    clearInterval(intervalId)
    setTimer(60)
    const interval = setInterval(()=>{
      setTimer(prev => prev - 1)
    }, 1000)
    setIntervalId(interval)
  }

  useEffect(()=>{
    initTimer()
  },[])

  useEffect(()=>{
    if (timer === 0) {
      clearInterval(intervalId)
    }
  },[timer])

  const onSubmit = async(code:string)=>{
    const res = await validateSecurityCode(email, code)
    if(!res?.error)
      navigation.navigate('UpdatePasswordScreen', {email})
  }

  const onResendEmailWithCode = async()=>{
    await passwordRecovery(email);
    initTimer()
  }

  return (
    <Formik
      initialValues={{
        securityCode: ''
      }}
      onSubmit={({securityCode}) => onSubmit(securityCode)}
      validationSchema={
        Yup.object({
          securityCode: Yup
            .string()
            .length(6, 'El código de seguridad no tiene los caracteres necesarios')
            .required('El código de seguridad es requerido')
        })
      }
    >
      {
        ({handleSubmit, errors, touched}) => (
          <>
            {(isLoading) && (
              <ActivityIndicator 
                size={30}
                color={theme.colors.primary}
                style={styles.loadingSpinner}
              />
            )}
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
            <TertiaryButton 
              label={`Reenviar código ${(timer > 0) ? timer : ''}`}
              onPress={onResendEmailWithCode}
              disable={(timer !== 0)}
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
})