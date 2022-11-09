import {CreateCategory, UpdateCategory} from "../interfaces/Category";
import {baseApi} from "./baseApi"


export const getCategoriesApi = async (idAccount:string, token:string)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories`,
    method: 'GET',
    token
  })
  
  return resp;
}

export const createCategoryApi = async (body:CreateCategory, idAccount:string, token:string)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories`,
    method: 'POST',
    body,
    token
  })
  
  return resp;
}

export const updateCategoryApi = async (idAccount:string, body:UpdateCategory, idCategory:string, token:string)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories/${idCategory}`,
    method: 'PATCH',
    body,
    token
  })
  
  return resp;
}

export const removeCategoryApi = async (idAccount:string, idCategory:string, token:string)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories/${idCategory}`,
    method: 'DELETE',
    token
  })
  
  return resp;
}