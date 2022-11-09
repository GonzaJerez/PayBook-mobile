import React, {useContext, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {Formik} from 'formik'
import * as Yup from 'yup'

import {InlineField} from './InlineField'
import {DateInput} from './DateInput'
import {RadioButtonsField} from './RadioButtonsField'
import {TextboxField} from './TextboxField'
import {SubmitOrCancelButtons} from '../buttons/SubmitOrCancelButtons'
import {TabBarNavigation} from '../../navigation/TabNavigation'
import {CategoriesContext} from '../../context/categories/CategoriesContext'
import {CategoryPicker} from '../fields/CategoryPicker'
import {CreateExpense} from '../../interfaces/Expense'

interface Props {
  initialValues: {
    amount: number;
    complete_date: Date;
    categoryId: string;
    subcategoryId: string;
    installments: number;
    description: string;
  }
  onSubmit: (body: CreateExpense) => void;
}

const dataToRadioButtons = [
  {
    label: 'Un solo pago',
    value: false
  },
  {
    label: 'Cuotas',
    value: true
  },
]

export const ExpenseForm = ({initialValues, onSubmit}: Props) => {

  const {goBack} = useNavigation<NativeStackNavigationProp<TabBarNavigation>>()
  const {allCategories, actualCategory, getCategories, setActualCategory} = useContext(CategoriesContext)


  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setActualCategory(allCategories.find(cat => cat.id === initialValues.categoryId) || null)
  }, [allCategories])


  const cleanForm = (resetForm: () => void) => {
    resetForm()
    goBack()
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, {resetForm}) => {
        onSubmit({
          ...values,
          complete_date: values.complete_date.getTime(),
        })
        resetForm()
      }}
      validationSchema={
        Yup.object({
          amount: Yup
            .number()
            .positive('El monto no puede ser negativo')
            .required('El monto no puede quedar vacío'),
          complete_date: Yup
            .date()
            .max(new Date())
            .required('Fecha inválida'),
          categoryId: Yup
            .string()
            .required('La categoría es requerida'),
          subcategoryId: Yup
            .string()
            .required('La subcategoría es requerida'),
          installments: Yup
            .number()
            .positive('Las cuotas no pueden ser negativas')
            .required(),
          name_credit_payment: Yup
            .string()
            .max(30),
          description: Yup
            .string()
            .max(200)
        })
      }
    >
      {({handleSubmit, errors, resetForm, values}) => (
        <View style={styles.formContainer}>
          <InlineField
            label='Monto'
            type='number-pad'
            name='amount'
            placeholder='100'
          />
          <DateInput
            name='complete_date'
          />
          <CategoryPicker
            label='Categoría'
            name='categoryId'
            options={allCategories}
          />
          <CategoryPicker
            label='Subcategoría'
            name='subcategoryId'
            options={actualCategory?.subcategories || []}
          />
          <RadioButtonsField
            name='installments'
            data={dataToRadioButtons}
          />
          {values.installments > 1 && (
            <InlineField
              label='Nombre de referencia'
              name='name_credit_payment'
              placeholder='Ej. Televisor'
            />
          )}
          <TextboxField
            name='description'
          />

          <SubmitOrCancelButtons
            onSubmit={handleSubmit}
            onCancel={() => cleanForm(resetForm)}
            disable={(Object.keys(errors).length > 0)}
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