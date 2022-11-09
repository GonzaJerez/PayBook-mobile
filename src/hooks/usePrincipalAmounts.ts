import {useContext, useEffect, useState} from "react"
import {ExpensesContext} from "../context/expenses/ExpensesContext"
import {PrincipalAmounts} from "../interfaces/Expense"

export const usePrincipalAmounts = ()=>{
  const {principalAmounts} = useContext(ExpensesContext)

  const [formatPrincipalAmounts, setFormatPrincipalAmounts] = useState<PrincipalAmounts[]>([])

  useEffect(() => {
    setFormatPrincipalAmounts([
      {
        title: 'Gastos en este mes',
        amount: principalAmounts.totalAmountOnMonth
      },
      {
        title: 'Gastos en esta semana',
        amount: principalAmounts.totalAmountOnWeek
      },
      {
        title: 'Gastos hoy',
        amount: principalAmounts.totalAmountOnDay
      },
      {
        title: 'Gastos fijos mensuales',
        amount: principalAmounts.totalAmountFixedCostsMonthly
      },
    ])
  }, [principalAmounts])

  return {
    formatPrincipalAmounts
  }
}