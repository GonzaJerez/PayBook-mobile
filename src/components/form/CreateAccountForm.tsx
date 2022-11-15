import { View, StyleSheet } from 'react-native'
import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'

import {Field} from './Field'
import {PickerField} from './PickerField'
import {TextboxField} from './TextboxField'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {getRange} from '../../helpers/getRange'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {CreateAccount} from '../../interfaces/Account'
import {MAX_USERS_IN_ACCOUNTS} from '../../constants/ContantsAccounts'
import {NewAccountTopTabNavigation} from '../../navigation/NewAccountTopTab'
import {ErrorRequest} from '../texts/ErrorRequest'


const maxUsersAllowed = getRange(MAX_USERS_IN_ACCOUNTS)

export const CreateAccountForm = () => {

  const {createAccount, isLoading} = useContext(AccountsContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<NewAccountTopTabNavigation>>()
  const [error, setError] = useState<string>()


  const toCreateAccount = async(values:CreateAccount)=>{
    const errorMessage = await createAccount(values)
    if(errorMessage){
      setError(errorMessage)
    } else {
      goBack();
    }
  }

  return (
    <Formik
      initialValues={{
        name: '',
        max_num_users: 10,
        description: ''
      }}
      onSubmit={toCreateAccount}
      validationSchema={
        Yup.object({
          name: Yup
            .string()
            .min(3, 'Nombre demasiado corto')
            .max(20, 'Nombre demasiado largo')
            .required('El nombre es requerido'),
          max_num_users: Yup
            .number()
            .min(1)
            .max(MAX_USERS_IN_ACCOUNTS)
            .required(),
          description: Yup
            .string()
            .max(100, 'Nombre demasiado largo')
      })}
    >
      {({handleSubmit, errors, touched})=>(
        <View style={styles.container}>
          <Field
            label='Nombre de cuenta'
            name='name'
            placeholder='Ej. Gastos personales'
          />
          <PickerField 
            label='Máxima cantidad de usuario permitidos'
            options={maxUsersAllowed.map(numUser => ({name:numUser, value: numUser}))}
            name='max_num_users'
          />
          <TextboxField 
            name='description'
            placeholder='Descripción de la cuenta'
          />

          {(error) && (<ErrorRequest>{error}</ErrorRequest>)}

          <SubmitOrCancelButtons 
            onCancel={()=>goBack()}
            onSubmit={handleSubmit}
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
    marginHorizontal:20,
    marginTop:40
  }
})