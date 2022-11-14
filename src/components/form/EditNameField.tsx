import {Text, StyleSheet, View} from 'react-native'
import React, {useContext, useState} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AccountStackNavigation} from '../../navigation/AccountNavigation';
import {Field} from './Field';
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {ErrorField} from '../texts/ErrorField';


interface Props {
  label: 'cuenta' | 'usuario' | 'categoría' | 'subcategoría' | 'gasto en cuotas';
  initialValue: string;
  isLoading: boolean;
  onSubmit: (body:{[x:string]:string})=>Promise<string | undefined>;
}

export const EditNameField = ({label,initialValue,isLoading,onSubmit}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const [error, setError] = useState<string|undefined>()

  const changeName = async(name:string) => {
    let hasError:string | undefined;
    if (label === 'usuario') {
      hasError = await onSubmit({fullName: name})
    } else {
      hasError = await onSubmit({name})
    }
    
    if(hasError){
      setError(hasError)
    } else{
      goBack()
    }
  }

  return (
    <Formik
      initialValues={{name: initialValue}}
      onSubmit={values => changeName(values.name)}
      validationSchema={Yup.object({
        name: Yup
          .string()
          .min(1)
          .required('El nombre no puede quedar vacío')
      })}
    >
      {({handleSubmit, errors}) => (
        <View style={styles.formContainer}>
          <Text style={[styles.label, {color:theme.colors.text}]}>Nombre de {label}:</Text>
          <Field
            placeholder={`Nombre de ${label}`}
            name='name'
          />

          {(error) && <ErrorField>{error}</ErrorField>}

          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={goBack}
            disable={Object.keys(errors).length > 0}
            isLoading={isLoading}
          />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  formContainer:{
    marginTop: 50,
    paddingHorizontal:40
  },
  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
})