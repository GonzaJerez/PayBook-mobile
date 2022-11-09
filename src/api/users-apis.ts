import {UpdateUser} from '../interfaces/User';
import {baseApi} from './baseApi';


interface BecomePremiumProps {
  id_subcription: string;
}


export const updateUserApi = async(body:UpdateUser, uid:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/users/${uid}`,
    method: 'PATCH',
    body,
    token
  })

  return resp;
}

export const deleteUserApi = async(uid:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/users/${uid}`,
    method: 'DELETE',
    token
  })

  return resp;
}

export const premiumUserApi = async(uid:string, token:string, body:{revenue_id:string}) =>{
  const resp = await baseApi({
    endpoint: `/users/premium/${uid}`,
    method: 'POST',
    body,
    token
  })

  return resp;
}

export const removePremiumUserApi = async(uid:string, token:string) =>{
  const resp = await baseApi({
    endpoint: `/users/premium/${uid}`,
    method: 'DELETE',
    token
  })

  return resp;
}