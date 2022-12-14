import React, {useContext} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {ThemeContext} from '../../context/theme/ThemeContext'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {PrivateStackNavigation} from '../../navigation/PrivateNavigation'
import {Expense} from '../../interfaces/Expense'
import {currencyFormat} from '../../helpers/currencyFormat'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {AuthContext} from '../../context/auth/AuthContext'


interface Props {
  expense: Expense
}

export const ExpenseItem = ({expense}: Props) => {

  const {navigate} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation, 'TabNavigation'>>()
  const {theme} = useContext(ThemeContext)
  const {user} = useContext(AuthContext)
  const {setActualExpense} = useContext(ExpensesContext)

  const onSelectExpense = ()=>{
    setActualExpense(expense);
    navigate('ExpensesNavigation',{screen:'DetailsExpenseScreen'})
  }

  return (
    <TouchableOpacity
      style={styles.expenseContainer}
      onPress={onSelectExpense}
    >

      <View style={styles.reasonContainer}>
        <View style={styles.titleExpenseContainer}>
          <Text style={[styles.categoryName, {color:theme.colors.text}]}>{expense.category.name}</Text>
          {(user?.id !== expense.user.id) && (
            <Text style={[styles.userName, {color:theme.disable}]}> - {expense.user.fullName}</Text>
          )}
        </View>
        <Text
          style={[
            styles.subcategoryName, {
              color: theme.disable
            }
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {expense.subcategory.name}
        </Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[styles.amount, {color:theme.colors.text}]}>{currencyFormat(expense.amount)}</Text>
        <Text style={[styles.dayName, {color: theme.disable}]}>{expense.day_name}</Text>

      </View>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  expenseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    alignItems: 'center',
    marginVertical: 10
  },
  reasonContainer: {
  },
  titleExpenseContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  userName:{
    top:2,
    fontSize:10,
  },
  categoryName: {
    fontWeight: '600',
    fontSize: 20
  },
  subcategoryName: {
    fontWeight: '600',
    top: 1,
    fontSize: 18
  },
  amountContainer: {
    alignItems: 'flex-end'
  },
  dayName: {
    marginTop: 3
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
  }
})