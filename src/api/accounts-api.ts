import {CreateAccount, UpdateAccount} from "../interfaces/Account";
import {baseApi} from "./baseApi";



export const getAccountsApi = async(token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts`,
    method: 'GET',
    token
  })

  return resp;
}

export const createAccountApi = async(body:CreateAccount, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts`,
    method: 'POST',
    body,
    token
  })

  return resp;
}

export const updateAccountApi = async(body:UpdateAccount, idAccount:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}`,
    method: 'PATCH',
    body,
    token
  })

  return resp;
}

export const joinToAccountApi = async(access_key:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts/join`,
    method: 'POST',
    body: {access_key},
    token
  })

  return resp;
}

export const leaveAccountApi = async(accountId:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts/leave/${accountId}`,
    method: 'DELETE',
    token
  })

  return resp;
}

export const pushoutApi = async(body:string[], idAccount:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts/pushout/${idAccount}`,
    method: 'PATCH',
    body: {idUsers: body},
    token
  })

  return resp;
}

export const removeAccountApi = async(idAccount:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}`,
    method: 'DELETE',
    token
  })

  return resp;
}