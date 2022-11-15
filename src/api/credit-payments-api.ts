import {UpdateCreditPayment} from "../interfaces/CreditExpenses";
import {baseApi} from "./baseApi"

export interface CreditPaymentsApi {
  idAccount:  string;
  token:      string;
}

export interface GetCreditPaymentsApi extends CreditPaymentsApi {
  pending?: boolean;
}
export interface GetCreditPaymentByIdApi extends CreditPaymentsApi {
  id: string;
}

export interface UpdateCreditPaymentApi extends RemoveCreditPaymentApi {
  body:            UpdateCreditPayment;
}

export interface RemoveCreditPaymentApi extends CreditPaymentsApi {
  idCreditPayment: string;
}


export const getCreditPaymentByIdApi = async({idAccount,token,id}:GetCreditPaymentByIdApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/credit-payments/${id}`,
    method: 'GET',
    token
  })

  return resp;
}

export const getAllCreditPaymentsApi = async({idAccount,token,pending}:GetCreditPaymentsApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/credit-payments${(pending) ? '?pending=true' : ''}`,
    method: 'GET',
    token
  })

  return resp;
}

export const updateCreditPaymentsApi = async({idAccount,token,body,idCreditPayment}:UpdateCreditPaymentApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/credit-payments/${idCreditPayment}`,
    method: 'PATCH',
    body,
    token
  })

  return resp;
}

export const removeCreditPaymentsApi = async({idAccount,token,idCreditPayment}:RemoveCreditPaymentApi)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/credit-payments/${idCreditPayment}`,
    method: 'DELETE',
    token
  })

  return resp;
}