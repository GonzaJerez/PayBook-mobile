import React, {useContext} from 'react'
import {View, StyleSheet} from 'react-native'

import {ExpenseItem} from '../item-lists/ExpenseItem'
import {Expense} from '../../interfaces/Expense'
import {EmptyData} from '../texts/EmptyData'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {RowLoader} from '../loaders/RowLoader'

interface Props {
  data: Expense[];
}

export const ExpensesList = ({data}:Props) => {

  const {isLoading} = useContext(ExpensesContext)

  if (data.length === 0 && !isLoading) {
    return (
      <EmptyData 
        text='No hay gastos disponibles'
      />
    )
  }

  return (
    <View style={styles.allExpensesContainer}>
      {(isLoading)
      ? (
        <>
          <RowLoader width={90}/>
          <RowLoader width={90}/>
          <RowLoader width={90}/>
          <RowLoader width={90}/>
        </>
      )
    : (
      data.map((exp) => (
        <ExpenseItem 
          key={exp.id} 
          expense={exp}
        />
      ))
    )}
    </View>
  )
}

const styles = StyleSheet.create({
  allExpensesContainer:{
    width:'100%'
  },
})