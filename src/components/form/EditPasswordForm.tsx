import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {UserStackNavigation} from '../../navigation/UserNavigation'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {AuthContext} from '../../context/auth/AuthContext'
import {PasswordField} from './PasswordField'


export const EditPasswordForm = () => {

  const {updateUser} = useContext(AuthContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<UserStackNavigation>>()

  const editPassword = (actualPassword:string, newPassword:string)=>{
    goBack()
    updateUser({
      password: actualPassword,
      newPassword
    })
  }

  return (
    <Formik
      initialValues={{
        actualPassword: '',
        newPassword1: '',
        newPassword2: ''
      }}
      onSubmit={(values) => editPassword(values.actualPassword, values.newPassword1)}
      validationSchema={Yup.object({
        actualPassword: Yup
          .string()
          .min(8, 'La contraseña debe tener mínimo 8 caracteres')
          .required('La contraseña es obligatoria'),
        newPassword1: Yup
          .string()
          .min(8, 'La contraseña debe tener mínimo 8 caracteres')
          .required('La contraseña es obligatoria'),
        newPassword2: Yup
          .string()
          .required('La contraseña es obligatoria')
          .oneOf([Yup.ref('newPassword1')], 'Las contraseñas no coinciden')
      })}
    >
      {({handleSubmit, errors, touched}) => (
        <View style={styles.container}>
          <PasswordField
            label='Contraseña actual'
            placeholder='········'
            name='actualPassword'
          />
          <PasswordField
            label='Nueva contraseña'
            placeholder='········'
            name='newPassword1'
          />
          <PasswordField
            label='Confirmar contraseña'
            placeholder='········'
            name='newPassword2'
          />
          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={goBack}
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
