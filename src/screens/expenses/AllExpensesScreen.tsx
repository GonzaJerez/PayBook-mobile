import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'

import {ExpensesList} from '../../components/lists/ExpensesList'
import {AccountsContext} from '../../context/accounts/AccountsContext'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {Expense} from '../../interfaces/Expense'

export const AllExpensesScreen = () => {

  const {actualAccount} = useContext(AccountsContext)
  const {getAllExpenses} = useContext(ExpensesContext)

  const [allExpenses, setAllExpenses] = useState<Expense[]>([])

  useEffect(()=>{
    getAllExpenses({limit:20})
      .then(res => {
        setAllExpenses(res?.expenses || [])
      })
  },[actualAccount])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listContainer}>
        <ExpensesList 
          data={allExpenses}
        />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer:{
    marginVertical: 20
  }
})