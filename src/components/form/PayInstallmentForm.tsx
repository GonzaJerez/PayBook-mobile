import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {InlineField} from './InlineField'
import {DateInput} from './DateInput'
import {TextboxField} from './TextboxField'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {PickerField} from './PickerField'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {PayInstallment} from '../../interfaces/CreditExpenses'
import {TabBarNavigation} from '../../navigation/TabNavigation'
import {InlineFixedValue} from '../fields/InlineFixedValue'
import {CreditExpensesContext} from '../../context/credit-expenses/CreditExpensesContext'
import {EmptyData} from '../texts/EmptyData'
import {ErrorRequest} from '../texts/ErrorRequest'
import {ThemeContext} from '../../context/theme/ThemeContext'


export const PayInstallmentForm = () => {

  const {navigate} = useNavigation<NativeStackNavigationProp<TabBarNavigation>>()

  const {theme} = useContext(ThemeContext)
  const {isLoading, payInstallment} = useContext(ExpensesContext)
  const {allCreditExpenses, getCreditPayments} = useContext(CreditExpensesContext)
  const [error, setError] = useState<string>()

  useEffect(()=>{
    getCreditPayments({})
  },[])


  const cleanForm = (resetForm: () => void) => {
    resetForm()
    navigate('HomeScreen')
  }

  const toPayInstallment = async(resetForm: () => void, values: PayInstallment, idCreditPayment: string) => {
    const errorMessage = await payInstallment(values, idCreditPayment)
    if(errorMessage){
      setError(errorMessage)
    } else {
      cleanForm(resetForm)
    }
  }

  if(allCreditExpenses.length === 0 && !isLoading){
    return (
      <EmptyData 
        text='No hay gastos en cuotas pendientes'
      />
    )
  }

  if(isLoading){
    return (
      <ActivityIndicator color={theme.colors.primary} style={{marginTop:30}}/>
    )
  }
  

  return (
    <Formik
      initialValues={{
        credit_payment: allCreditExpenses[0]?.id,
        amount: 0,
        complete_date: new Date(),
        description: ''
      }}
      onSubmit={(values, {resetForm}) => toPayInstallment(
        resetForm, {
        amount: values.amount,
        complete_date: values.complete_date.getTime(),
        description: values.description
      },
        values.credit_payment
      )}
      validationSchema={
        Yup.object({
          credit_payment: Yup
            .string(),
          amount: Yup
            .number()
            .positive('El monto no puede ser negativo')
            .required('El monto no puede quedar vacío'),
          complete_date: Yup
            .date()
            .max(new Date())
            .required('Fecha inválida'),
          description: Yup
            .string()
            .max(200)
        })
      }
    >
      {({handleSubmit, errors, resetForm, values}) => (
        <View style={styles.formContainer}>
          <PickerField
            label='Gasto'
            name='credit_payment'
            options={allCreditExpenses?.map(cred => ({name: cred.name, value: cred.id})) || []}
          />
          <InlineFixedValue
            label='Cuotas pagadas'
            value={
              `${allCreditExpenses[0].installments_paid}/${allCreditExpenses[0].installments}`
            }
          />
          <InlineField
            label='Monto'
            type='number-pad'
            name='amount'
            placeholder='100'
          />
          <DateInput
            name='complete_date'
          />
          <TextboxField
            name='description'
          />
          {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={() => cleanForm(resetForm)}
            disable={(Object.keys(errors).length > 0)}
            isLoading={isLoading}
          />
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
    marginBottom: 40,
  }
})