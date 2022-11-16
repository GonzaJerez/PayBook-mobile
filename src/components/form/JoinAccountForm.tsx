import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import React, {useContext, useState} from 'react'
import {BigInput} from './BigInput'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {NewAccountTopTabNavigation} from '../../navigation/NewAccountTopTab'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {ErrorRequest} from '../texts/ErrorRequest'

export const JoinAccountForm = () => {

  const {popToTop} = useNavigation<NativeStackNavigationProp<NewAccountTopTabNavigation>>()
  const {theme} = useContext(ThemeContext)
  const {joinToAccount, isLoading} = useContext(AccountsContext)
  const [error, setError] = useState<string>()

  const toJoinAccount = async(access_key:string)=>{
    const errorMessage = await joinToAccount(access_key)
    if(errorMessage){
      setError(errorMessage)
    } else {
      popToTop()
    }
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
          {(isLoading) && (<ActivityIndicator color={theme.colors.primary}/>)}
          {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
          <BigInput 
            name='access_key'
            label='Clave de acceso'
            type='default'
          />
          <SubmitOrCancelButtons 
            submitLabel='Unirme'
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