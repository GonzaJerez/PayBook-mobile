import React, {useContext} from 'react'
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native'

import {HeaderBrand} from '../../../../components/brand/HeaderBrand'
import {ExpenseForm} from '../../../../components/form/ExpenseForm'
import {ExpensesContext} from '../../../../context/expenses/ExpensesContext'


export const NewExpenseScreen = () => {

  const {createExpense} = useContext(ExpensesContext)

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>

        <HeaderBrand />
        <ExpenseForm
          onSubmit={createExpense}
          initialValues={{
            amount: 0,
            categoryId: '',
            complete_date: new Date(),
            description: '',
            installments: 1,
            subcategoryId: ''
          }}
        />

      </ScrollView>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
})