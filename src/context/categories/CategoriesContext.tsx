import {createContext, useContext, useReducer} from 'react';
import {createCategoryApi, getCategoriesApi, removeCategoryApi, updateCategoryApi} from '../../api/categories-api';
import {Category, CategoryResponse, CreateCategory, GetCategoriesProps, UpdateCategory} from '../../interfaces/Category';
import {AccountsContext} from '../accounts/AccountsContext';
import {AuthContext} from '../auth/AuthContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';
import {CategoriesReducer, CategoriesState} from './CategoriesReducer';


interface CategoriesContextProps extends CategoriesState {
  getCategories: () => Promise<void>;
  setActualCategory: (category: Category | null) => void;
  createCategory: (body: CreateCategory) => Promise<void>;
  updateCategory: (body: UpdateCategory) => Promise<void>;
  removeCategory: () => Promise<void>;
  updateStateActualCategory: (category: Category) => void;
}

const initialValues:CategoriesState = {
  actualCategory: null,
  allCategories: []
}


export const CategoriesContext = createContext({} as CategoriesContextProps)


export const CategoriesProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const {token} = useContext(AuthContext)
  const {showStatus, setSuccessStatus, setFailureStatus, handleConnectionFail} = useContext(RequestsStatusContext)
  const {actualAccount} = useContext(AccountsContext)

  const [state, dispatch] = useReducer(CategoriesReducer, initialValues)


  const getCategories = async ()=>{
    if(!token || !actualAccount) return;
    try {
      const resp:GetCategoriesProps = await getCategoriesApi(actualAccount.id,token)
      if(!existError(resp)){
        dispatch({type:'getCategories', payload:{categories: resp.categories}})
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const setActualCategory = (category: Category | null)=>{
    dispatch({type:'setActualCategory',payload:{category}})
  }

  const createCategory = async (body:CreateCategory)=>{
    if(!token || !actualAccount) return;
    
    showStatus({
      failureMessage:'No se pudo crear categoría',
      loadingMessage: 'Creando...',
      successMessage: 'Categoría creada'
    })

    try {
      const resp:CategoryResponse = await createCategoryApi(body, actualAccount.id,token)
      if(!existError(resp)){
        dispatch({type:'createCategory', payload:{category: resp.category}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const updateCategory = async (body:UpdateCategory)=>{
    if(!token || !actualAccount || !state?.actualCategory) return;

    showStatus({
      failureMessage:'No se pudo actualizar categoría',
      loadingMessage: 'Actualizando...',
      successMessage: 'Categoría actualizada'
    })

    try {
      const resp:CategoryResponse = await updateCategoryApi(actualAccount.id, body, state?.actualCategory?.id,token )
      if(!existError(resp)){
        updateStateActualCategory(resp.category)
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const removeCategory = async ()=>{
    if(!token || !actualAccount || !state?.actualCategory) return;

    showStatus({
      failureMessage:'No se pudo eliminar categoría',
      loadingMessage: 'Eliminando...',
      successMessage: 'Categoría eliminada'
    })

    try {
      const resp:CategoryResponse = await removeCategoryApi(actualAccount.id, state?.actualCategory?.id,token )
      if(!existError(resp)){
        dispatch({type:'removeCategory', payload:{idCategory:state.actualCategory.id}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const updateStateActualCategory = (category:Category)=>{
    dispatch({type:'updateCategory', payload:{category}})
  }


  const existError = (resp: GetCategoriesProps | CategoryResponse) => {
    let existError = false;
    if (resp.statusCode !== 200 && resp.message) {
      setFailureStatus()
      existError = true;
    }
    return existError;
  }


  return (
    <CategoriesContext.Provider 
      value={{
        ...state,
        getCategories,
        setActualCategory,
        createCategory,
        updateCategory,
        removeCategory,
        updateStateActualCategory
      }}>
      {children}
    </CategoriesContext.Provider>
  )
}