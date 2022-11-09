import {PayInstallment} from "../interfaces/CreditExpenses";
import {CreateExpense, FiltersStatisctics, UpdateExpense} from "../interfaces/Expense"
import {PaginationQuerys} from "../interfaces/Querys";
import {baseApi} from "./baseApi"

export interface ExpensesApi {
  idAccount:  string;
  token:      string;
}

export interface CreateExpenseApi extends ExpensesApi {
  body:       CreateExpense;
}

export interface GetExpensesApi extends ExpensesApi {
  querys?: PaginationQuerys
}

export interface GetPrincipalAmountsApi extends ExpensesApi {
  body?: FiltersStatisctics
}

export interface UpdateExpenseApi extends RemoveExpenseApi{
  body: UpdateExpense
}

export interface RemoveExpenseApi extends ExpensesApi{
  idExpense: string;
}

export interface PayInstallmentApi extends ExpensesApi{
  idCreditPayment: string;
  body:            PayInstallment
}


export const createExpenseApi = async({body,idAccount,token}:CreateExpenseApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses`,
    method: 'POST',
    body,
    token
  })

  return resp;
}

export const getExpensesApi = async ({idAccount,token,querys}:GetExpensesApi)=>{
  const queryParameters = createQueryUrl(querys)

  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses${queryParameters}`,
    method: 'GET',
    token
  })

  return resp;
}

export const getPrincipalAmountsApi = async({idAccount, token}:ExpensesApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses/statistics/main`,
    method: 'GET',
    token
  })

  return resp;
}

export const statisticsApi = async({idAccount, token, body}:GetPrincipalAmountsApi)=>{
  // const queryParameters = createQueryUrl(querys)

  const resp = await baseApi({
    // endpoint: `/accounts/${idAccount}/expenses/statistics${queryParameters}`,
    endpoint: `/accounts/${idAccount}/expenses/statistics`,
    method: 'POST',
    body,
    token
  })

  return resp;
}

export const updateExpenseApi = async({idAccount, body, token, idExpense}:UpdateExpenseApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses/${idExpense}`,
    method: 'PATCH',
    body,
    token
  })

  return resp;
}

export const removeExpenseApi = async({idAccount, token, idExpense}:RemoveExpenseApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses/${idExpense}`,
    method: 'DELETE',
    token
  })

  return resp;
}

export const payInstallmentApi = async({idAccount, token, idCreditPayment, body}:PayInstallmentApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/expenses/payInstallment/${idCreditPayment}`,
    method: 'POST',
    body,
    token
  })

  return resp;
}



const createQueryUrl = (querys?: PaginationQuerys)=>{
  let queryParameters = ''

  if(querys){
    Object.entries(querys).forEach((q, idx) =>{
      if(idx === 0){
        queryParameters += '?'
      } else {
        queryParameters += '&'
      }
      queryParameters += `${q[0]}=${q[1]}`
    })
  }

  return queryParameters;
}