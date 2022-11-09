import {CreateUser} from "../interfaces/User";
import {baseApi} from "./baseApi";


export const checkTokenApi = async(token:string) =>{
  const resp = await baseApi({
    endpoint: '/auth/checkToken',
    method: 'GET',
    token
  })

  return resp;
}

export const checkPremiumApi = async(token:string) =>{
  const resp = await baseApi({
    endpoint: '/auth/checkPremium',
    method: 'GET',
    token
  })

  return resp;
}


export const loginApi = async (body:LoginUser) => {
  const resp = await baseApi( {
      endpoint: '/auth/login',
      method: 'POST',
      body,
  } )

  return resp;
}

export const googleLoginApi = async (tokenGoogle:string) => {
  const resp = await baseApi( {
      endpoint: '/users/google',
      method: 'POST',
      body:{tokenGoogle},
  } )

  return resp;
}

export const registerApi = async (body:CreateUser) =>{
  
  const {fullName, email1:email, password1:password} = body;

  const resp = await baseApi({
    endpoint: '/users/register',
    method: 'POST',
    body: {fullName, email, password}
  })

  return resp;
}