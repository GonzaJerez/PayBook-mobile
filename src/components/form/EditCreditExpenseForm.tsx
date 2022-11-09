import React, {useContext} from 'react'
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

export const EditCreditExpenseForm = () => {

  const {actualCreditExpense, updateCreditExpense} = useContext(CreditExpensesContext)
  const {goBack} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()

  const toUpdate = (values:UpdateCreditPayment) => {
    goBack();
    updateCreditExpense(values)
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
              .min(1)
              .positive('Las cuotas no pueden ser negativas')
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

            <SubmitOrCancelButtons 
              onCancel={()=>{}}
              onSubmit={handleSubmit}
            />

          </View>
        )}
      </Formik>
  )
}
