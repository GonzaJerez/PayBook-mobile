import React, {useContext} from 'react'

import {RowInfo} from '../item-lists/RowInfo'
import {DataDescription} from '../item-lists/DataDescription'
import {ExpensesContext} from '../../context/expenses/ExpensesContext'
import {currencyFormat} from '../../helpers/currencyFormat'
import {InfoListContainer} from './InfoListContainer'


export const ListDetailsExpense = () => {

  const {actualExpense} = useContext(ExpensesContext)
  const yearWithTwoDigits = String(actualExpense?.year).slice(2)
  const formatDate = `${actualExpense?.num_date}/${actualExpense?.month}/${yearWithTwoDigits}`

  return (
    <InfoListContainer>

      <RowInfo label='Monto' value={currencyFormat(actualExpense?.amount || 0)} />
      <RowInfo label='Categoría' value={actualExpense?.category.name || ''} />
      <RowInfo label='Subcategoría' value={actualExpense?.subcategory.name || ''} />
      <RowInfo label='Fecha' value={`${actualExpense?.day_name}, ${formatDate}`} />
      <RowInfo label='Usuario' value={actualExpense?.user.fullName || ''} />
      <>
        {
          (actualExpense?.credit_payment) && (<RowInfo label='Couta pagada' value='Sí' />)
        }
      </>

      <DataDescription description={actualExpense?.description || ''} />

    </InfoListContainer>

  )
}