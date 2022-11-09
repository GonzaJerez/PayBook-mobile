import React from 'react'
import {KeyboardAvoidingView, ScrollView, StyleSheet} from 'react-native'

import {HeaderBrand} from '../../../../components/brand/HeaderBrand'
import {ExpenseForm} from '../../../../components/form/ExpenseForm'
import {useExpenseActions} from '../../../../hooks/useExpenseActions'

export const NewExpenseScreen = () => {

  const {toCreateExpense} = useExpenseActions()

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.container}>

        <HeaderBrand />
        <ExpenseForm
          onSubmit={toCreateExpense}
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