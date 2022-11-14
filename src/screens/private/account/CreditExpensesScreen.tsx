import React, {useContext, useEffect} from 'react'
import {Text, FlatList} from 'react-native'

import {CreditExpenseRow} from '../../../components/item-lists/CreditExpenseRow'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {CreditExpensesContext} from '../../../context/credit-expenses/CreditExpensesContext'
import {CreditPayment} from '../../../interfaces/CreditExpenses'


interface Props extends NativeStackScreenProps<AccountStackNavigation,'CreditExpensesScreen'>{}

export const CreditExpensesScreen = ({navigation}:Props) => {

  const {allCreditExpenses, getCreditPayments, setActualCreditExpense} = useContext(CreditExpensesContext)

  useEffect(()=>{
    getCreditPayments({pending:false})
  },[])

  const toSelectCreditExpense = (creditExpense:CreditPayment)=>{
    setActualCreditExpense(creditExpense)
    navigation.navigate('DetailCreditExpenseScreen')
  }

  return (
    <FlatList
      data={allCreditExpenses}
      renderItem={({item}) => (
        <CreditExpenseRow 
          item={item}
          onPress={()=>toSelectCreditExpense(item)}
        />
      )}
    >
      <Text>CreditExpensesScreen</Text>
    </FlatList>
  )
}

