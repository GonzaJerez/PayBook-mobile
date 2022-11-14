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
  createCategory: (body: CreateCategory) => Promise<string | undefined>
  updateCategory: (body: UpdateCategory) => Promise<string | undefined>;
  removeCategory: () => Promise<string | undefined>;
  updateStateActualCategory: (category: Category) => void;
}

const initialValues:CategoriesState = {
  actualCategory: null,
  allCategories: [],
  isLoading: false,
}


export const CategoriesContext = createContext({} as CategoriesContextProps)


export const CategoriesProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const {token} = useContext(AuthContext)
  const {showNotification, handleConnectionFail} = useContext(RequestsStatusContext)
  const {actualAccount} = useContext(AccountsContext)

  const [state, dispatch] = useReducer(CategoriesReducer, initialValues)


  const getCategories = async ()=>{
    if(!token || !actualAccount) return;
    startLoading()
    try {
      const resp:GetCategoriesProps = await getCategoriesApi(actualAccount.id,token)
      if(!resp.error){
        dispatch({type:'getCategories', payload:{categories: resp.categories}})
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const setActualCategory = (category: Category | null)=>{
    dispatch({type:'setActualCategory',payload:{category}})
  }

  const createCategory = async (body:CreateCategory)=>{
    if(!token || !actualAccount) return;
    
    startLoading()

    try {
      const resp:CategoryResponse = await createCategoryApi(body, actualAccount.id,token)
      if(resp.error) {
        return resp.message
      } else {
        dispatch({type:'createCategory', payload:{category: resp.category}})
        showNotification('Categoría creada')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const updateCategory = async (body:UpdateCategory)=>{
    if(!token || !actualAccount || !state?.actualCategory) return;

    startLoading()

    try {
      const resp:CategoryResponse = await updateCategoryApi(actualAccount.id, body, state?.actualCategory?.id,token )
      if(resp.error){
        return resp.message
      } else{
        updateStateActualCategory(resp.category)
        showNotification('Categoría actualizada')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const removeCategory = async ()=>{
    if(!token || !actualAccount || !state?.actualCategory) return;

    startLoading()

    try {
      const resp:CategoryResponse = await removeCategoryApi(actualAccount.id, state?.actualCategory?.id,token )
      if(resp.error){
        return resp.message;
      } else {
        dispatch({type:'removeCategory', payload:{idCategory:state.actualCategory.id}})
        showNotification('Categoría eliminada')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const updateStateActualCategory = (category:Category)=>{
    dispatch({type:'updateCategory', payload:{category}})
  }

  
  const startLoading = () => {
		dispatch({ type: 'startLoading' });
	};

	const finishLoading = () => {
		dispatch({ type: 'finishLoading' });
	};


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