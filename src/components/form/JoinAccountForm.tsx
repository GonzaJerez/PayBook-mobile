import {View, Text, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import {BigInput} from './BigInput'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NewAccountTopTabNavigation} from '../../navigation/NewAccountTopTab'
import {AccountsContext} from '../../context/accounts/AccountsContext'

export const JoinAccountForm = () => {

  const {popToTop} = useNavigation<NativeStackNavigationProp<NewAccountTopTabNavigation>>()
  const {joinToAccount} = useContext(AccountsContext)

  const toJoinAccount = (access_key:string)=>{
    popToTop()
    joinToAccount(access_key)
  }

  return (
    <Formik
      initialValues={{
        access_key:''
      }}
      onSubmit={(values)=>toJoinAccount(values.access_key)}
      validationSchema={Yup.object({
        access_key: Yup
          .string()
          .length(8, 'La clave de acceso es inválida')
          .required('La clave es necesaria')
      })}
    >
      {({handleSubmit, errors, touched}) => (
        <View style={styles.container}>
          <BigInput 
            name='access_key'
            label='Clave de acceso'
            type='default'
          />
          <SubmitOrCancelButtons 
            onSubmit={handleSubmit}
            onCancel={popToTop}
            disable={(Object.keys(errors).length > 0 || Object.keys(touched).length === 0)}
          />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50
  }
})