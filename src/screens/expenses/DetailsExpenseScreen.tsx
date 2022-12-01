import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, ScrollView, ActivityIndicator } from 'react-native'

import {ListDetailsExpense} from '../../components/lists/ListDetailsExpense'
import {OptionsButton} from '../../components/buttons/OptionsButton'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {ExpenseStackNavigation} from '../../navigation/ExpensesNavigation'
import {useAlertToConfirm} from '../../hooks/useAlertToConfirm'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {ThemeContext} from '../../context/theme/ThemeContext'
import {ErrorRequest} from '../../components/texts/ErrorRequest'
import {AuthContext} from '../../context/auth/AuthContext'
import {AccountsContext} from '../../context/accounts/AccountsContext'


interface Props extends NativeStackScreenProps<ExpenseStackNavigation,'DetailsExpenseScreen'>{}


export const DetailsExpenseScreen = ({navigation}:Props) => {

  const {theme} = useContext(ThemeContext)
  const {user} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)
  const {actualExpense ,isLoading, removeExpense} = useContext(ExpensesContext)
  const [error, setError] = useState<string>()

  const toRemoveExpense = async()=>{
    const errorMessage = await removeExpense()
    if(errorMessage){
      setError(errorMessage)
    } else {
      navigation.popToTop();
    }
  }
 
  const {showAlert} = useAlertToConfirm({
    title: 'Eliminar gasto',
    message:'¿Seguro deseas eliminar este gasto? No se puede volver a recuperar.',
    onCancel:()=>{},
    onConfirm: toRemoveExpense,
    textToConfirm: 'Eliminar'
  })
  
  const options = [
    {
      label: 'Editar gasto',
      icon: 'pencil-outline',
      onPress: ()=>navigation.navigate('EditExpenseScreen')
    },
    {
      label: 'Eliminar gasto',
      icon: 'trash-outline',
      onPress: showAlert
    },
  ]

  useEffect(()=>{
    navigation.setOptions({
      headerRight: ()=>{
        if(actualExpense?.user.id === user?.id || actualAccount?.admin_user.id === user?.id){
          return (
            <OptionsButton 
            options={options}
          />
          )
        }
      }
      
    })
  },[])

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {(isLoading) && (<ActivityIndicator color={theme.colors.primary} style={styles.spinner}/>)}
      {(error) && (<ErrorRequest>{error}</ErrorRequest>)}
      <ListDetailsExpense />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  spinner:{
    marginTop:10
  }
})