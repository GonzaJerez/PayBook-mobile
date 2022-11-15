import React, {useContext, useEffect} from 'react'
import {Text, FlatList} from 'react-native'

import {CreditExpenseRow} from '../../../components/item-lists/CreditExpenseRow'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AccountStackNavigation} from '../../../navigation/AccountNavigation'
import {CreditExpensesContext} from '../../../context/credit-expenses/CreditExpensesContext'
import {CreditPayment} from '../../../interfaces/CreditExpenses'
import {EmptyData} from '../../../components/texts/EmptyData'


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

  if(allCreditExpenses.length === 0){
    return (
      <EmptyData text='No existen gastos en cuotas en esta cuenta aún.'/>
    )
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

