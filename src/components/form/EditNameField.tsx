import {Text, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AccountStackNavigation} from '../../navigation/AccountNavigation';
import {Field} from './Field';
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons';
import {ThemeContext} from '../../context/theme/ThemeContext';


interface Props {
  label: 'cuenta' | 'usuario' | 'categoría' | 'subcategoría' | 'gasto en cuotas';
  initialValue: string;
  onSubmit: (body:{[x:string]:string})=>void;
}

export const EditNameField = ({label,initialValue,onSubmit}: Props) => {

  const {theme} = useContext(ThemeContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()

  const changeName = (name:string) => {
    if (label === 'usuario') {
      onSubmit({fullName: name})
    } else {
      onSubmit({name})
    }
    goBack()
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
        <>
          <Text style={[styles.label, {color:theme.colors.text}]}>Nombre de {label}:</Text>
          <Field
            placeholder={`Nombre de ${label}`}
            name='name'
          />

          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={goBack}
            disable={Object.keys(errors).length > 0}
          />
        </>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({

  label: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
})