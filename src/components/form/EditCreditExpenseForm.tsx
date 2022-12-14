import React, {useContext, useState} from 'react'
import { View } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {Field} from './Field'
import {InlineField} from './InlineField'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {CreditExpensesContext} from '../../context/credit-expenses/CreditExpensesContext'
import {UpdateCreditPayment} from '../../interfaces/CreditExpenses'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {AccountStackNavigation} from '../../navigation/AccountNavigation'
import {ErrorRequest} from '../texts/ErrorRequest'

export const EditCreditExpenseForm = () => {

  const {actualCreditExpense, isLoading, updateCreditExpense} = useContext(CreditExpensesContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const [error, setError] = useState<string>()

  const toUpdate = async(values:UpdateCreditPayment) => {
    const errorMessage = await updateCreditExpense(values)
    if(errorMessage){
      setError(errorMessage)
    } else {
      goBack();
    }
  }

  return (
    <Formik
        initialValues={{
          name: actualCreditExpense?.name,
          installments: actualCreditExpense?.installments
        }}
        onSubmit={toUpdate}
        validationSchema={
          Yup.object({
            name: Yup
              .string()
              .required('El nombre no puede quedar vacío')
              .max(30),
            installments: Yup
              .number()
              .typeError('Número inválido')
              .min(actualCreditExpense?.installments_paid || 1, 'No puede tener menos cuotas que la cantidad de cuotas pagadas al momento')
              .required('La cantidad de cuotas no puede quedar vacía')
          })
        }
      >
        {({handleSubmit})=>(
          <View>

            <Field 
              name='name'
              label='Editar nombre'
              placeholder='Ej. Televisor'
            />

            <InlineField 
              name='installments'
              label='Cantidad de cuotas'
              placeholder='1'
              type='number-pad'
            />

            {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
            
            <SubmitOrCancelButtons 
              onCancel={goBack}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />

          </View>
        )}
      </Formik>
  )
}
