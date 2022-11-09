import {useContext} from "react"
import {useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"

import {ExpensesContext} from "../context/expenses/ExpensesContext"
import {CreateExpense, UpdateExpense} from "../interfaces/Expense"
import {PrivateStackNavigation} from "../navigation/PrivateNavigation"
import {useAlertToConfirm} from "./useAlertToConfirm"

export const useExpenseActions = ()=>{

  const {popToTop, goBack} = useNavigation<NativeStackNavigationProp<PrivateStackNavigation>>()
  const {removeExpense, createExpense, updateExpense} = useContext(ExpensesContext)

  const toCreateExpense = (body:CreateExpense)=>{
    goBack();
    createExpense(body)
    // if(body.installments > 1){
    //   getCreditPayments({})
    // }
  }

  const toUpdateExpense = (body:UpdateExpense) => {
    goBack();
    updateExpense(body)
    // if(body.installments && body.installments > 1){
    //   getCreditPayments({})
    // }
  }

  const toRemoveExpense = ()=>{
    popToTop();
    removeExpense()
  }
 
  const {showAlert} = useAlertToConfirm({
    title: 'Eliminar gasto',
    message:'¿Seguro deseas eliminar este gasto? No se puede volver a recuperar.',
    onCancel:()=>{},
    onConfirm: toRemoveExpense,
    textToConfirm: 'Eliminar'
  })


  return {
    toCreateExpense,
    toUpdateExpense,
    showAlert,
  }
}