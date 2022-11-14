import React, {useContext} from 'react'
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native'

import {HeaderBrand} from '../../components/brand/HeaderBrand'
import {ExpenseForm} from '../../components/form/ExpenseForm'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'


export const EditExpenseScreen = () => {

  const {actualExpense, updateExpense} = useContext(ExpensesContext)

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>

        <HeaderBrand />
        <ExpenseForm
          initialValues={{
            amount: actualExpense?.amount || 0,
            categoryId: actualExpense?.category.id || '',
            complete_date: new Date(Number(actualExpense?.complete_date)),
            description: actualExpense?.description || '',
            installments: actualExpense?.credit_payment?.installments || 1,
            subcategoryId: actualExpense?.subcategory.id || ''
          }}
          onSubmit={updateExpense}
        />

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  formContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
    marginBottom: 40
  }
})