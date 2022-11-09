import React, {useEffect} from 'react'
import {StyleSheet, ScrollView } from 'react-native'

import {ListDetailsExpense} from '../../components/lists/ListDetailsExpense'
import {OptionsButton} from '../../components/buttons/OptionsButton'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {useExpenseActions} from '../../hooks/useExpenseActions'
import {ExpenseStackNavigation} from '../../navigation/ExpensesNavigation'


interface Props extends NativeStackScreenProps<ExpenseStackNavigation,'DetailsExpenseScreen'>{}


export const DetailsExpenseScreen = ({navigation}:Props) => {

  const {showAlert} = useExpenseActions()
  
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
      headerRight: ()=>(
        <OptionsButton 
        options={options}
      />
      )
    })
  },[])

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <ListDetailsExpense />
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
})