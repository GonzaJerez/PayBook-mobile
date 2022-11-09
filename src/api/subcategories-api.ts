import {CreateSubcategory, UpdateSubcategory} from "../interfaces/Subcategory";
import {baseApi} from "./baseApi";

export interface SubcategoriesApisProps {
  idAccount:  string;
  idCategory: string;
  token:      string;
}

export interface CreateSubcategoryApiProps extends SubcategoriesApisProps{
  body: CreateSubcategory
}

export interface UpdateSubcategoryApiProps extends DeleteSubcategoryApiProps {
  body: UpdateSubcategory;
}

export interface DeleteSubcategoryApiProps extends SubcategoriesApisProps {
  idSubcategory: string;
}



export const createSubategoryApi = async ({body,idAccount,idCategory,token}:CreateSubcategoryApiProps)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories/${idCategory}/subcategories`,
    method: 'POST',
    body,
    token
  })
  
  return resp;
}

export const updateSubategoryApi = async ({body,idAccount,idCategory,idSubcategory,token}:UpdateSubcategoryApiProps)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories/${idCategory}/subcategories/${idSubcategory}`,
    method: 'PATCH',
    body,
    token
  })
  
  return resp;
}

export const removeSubategoryApi = async ({idAccount,idCategory,idSubcategory,token}:DeleteSubcategoryApiProps)=>{
  const resp = await baseApi({
    endpoint: `/accounts/${idAccount}/categories/${idCategory}/subcategories/${idSubcategory}`,
    method: 'DELETE',
    token
  })
  
  return resp;
}