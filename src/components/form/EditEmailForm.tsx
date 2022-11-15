import React, {useContext, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {UserStackNavigation} from '../../navigation/UserNavigation'
import {FixedValue} from './FixedValueField'
import {AuthContext} from '../../context/auth/AuthContext'
import {ErrorRequest} from '../texts/ErrorRequest'

export const EditEmailForm = () => {

  const {user, isLoading, updateUser} = useContext(AuthContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<UserStackNavigation>>()

  const [error, setError] = useState<string>()

  const updateEmail = async(newEmail:string)=>{
    const hasError = await updateUser({email:newEmail})
    if(hasError){
      setError(hasError)
    } else {
      goBack()
    }
  }

  return (
    <Formik
      initialValues={{
        email1: '',
        email2: ''
      }}
      onSubmit={(values)=>updateEmail(values.email1)}
      validationSchema={Yup.object({
        email1: Yup
          .string()
          .required('El email es requerido')
          .email('Email no válido'),
        email2: Yup
          .string()
          .email('Email no válido')
          .required('El email es requerido')
          .oneOf([Yup.ref('email1')], 'Los emails no coinciden')
      })}
    >
      {({handleSubmit, errors, touched}) => (
        <View style={styles.container}>
          <FixedValue 
            label='Actual email' 
            fixedValue={user?.email}
          />
          <Field 
            label='Nuevo email' 
            placeholder='otro_email@gmail.com' 
            type='email-address'
            name='email1'
          />
          <Field 
            label='Confirmar email' 
            placeholder='otro_email@gmail.com'
            type='email-address'
            name='email2'
          />
          {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={goBack}
            isLoading={isLoading}
            disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
          />
        </View>

      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 60
  }
})