import {useContext} from "react"
import {useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"

import {AccountsContext} from "../context/accounts/AccountsContext"
import {AccountStackNavigation} from "../navigation/AccountNavigation"
import {useAlertToConfirm} from "./useAlertToConfirm"

export const useAccountActions = ()=>{

  const {popToTop} = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()
  const {leaveAccount, removeAccount} = useContext(AccountsContext)

  const toLeaveAccount = ()=>{
    popToTop()
    leaveAccount()

  }
  const toRemoveAccount = ()=>{
    popToTop()
    removeAccount()
  }

  const {showAlert:showAlertLeave} = useAlertToConfirm({
    title: 'Abandonar cuenta',
    message:'¿Seguro deseas abandonar la cuenta? No tendrás acceso a los gastos que hayas hecho en ella.',
    onCancel:()=>{},
    onConfirm: toLeaveAccount,
    textToConfirm: 'Abandonar'
  })
  
  const {showAlert:showAlertDelete} = useAlertToConfirm({
    title: 'Eliminar cuenta',
    message:'¿Seguro deseas eliminar la cuenta? No se puede volver a recuperar.',
    onCancel:()=>{},
    onConfirm: toRemoveAccount,
    textToConfirm: 'Eliminar'
  })

  return {
    showAlertLeave,
    showAlertDelete,
  }
}