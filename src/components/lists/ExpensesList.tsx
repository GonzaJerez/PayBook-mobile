import React from 'react'
import {View, StyleSheet} from 'react-native'

import {ExpenseItem} from '../item-lists/ExpenseItem'
import {Expense} from '../../interfaces/Expense'
import {EmptyData} from '../texts/EmptyData'

interface Props {
  data: Expense[]
}

export const ExpensesList = ({data}:Props) => {

  if (data.length === 0) {
    return (
      <EmptyData 
        text='No hay gastos disponibles'
      />
    )
  }

  return (
    <View style={styles.allExpensesContainer}>
      {
        data.map((exp) => (
          <ExpenseItem 
            key={exp.id} 
            expense={exp}
          />
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  allExpensesContainer:{
    width:'100%'
  },
})