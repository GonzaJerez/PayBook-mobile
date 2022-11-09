import React, {useContext, useEffect} from 'react'
import {StyleSheet, ScrollView} from 'react-native'

import {CarouselAmounts} from '../../../components/carousels/CarouselAmounts';
import {ShowExpensesCard} from '../../../components/lists/ShowExpensesCard';
import {LIMIT_EXPENSES_HOME} from '../../../constants/ContantsAccounts';
import {AccountsContext} from '../../../context/accounts/AccountsContext';
import {ExpensesContext} from '../../../context/expenses/ExpensesContext';
import {ThemeContext} from '../../../context/theme/ThemeContext';

export const HomeScreen = () => {

  const {theme} = useContext(ThemeContext)
  const {actualAccount} = useContext(AccountsContext)
  const {lastExpenses, getLastExpenses} = useContext(ExpensesContext)

  useEffect(() => {
    getLastExpenses({})
  }, [actualAccount])

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: theme.colors.card}]}
    >

      <ShowExpensesCard
        data={lastExpenses.slice(0, LIMIT_EXPENSES_HOME)}
        title='Últimos gastos'
        showAllExpensesButton
      >
        <CarouselAmounts />
      </ShowExpensesCard>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})