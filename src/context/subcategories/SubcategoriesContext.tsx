import {createContext, useContext, useState} from 'react';
import {createSubategoryApi, removeSubategoryApi, updateSubategoryApi} from '../../api/subcategories-api';
import {CreateSubcategory, SubcategoryResponse, UpdateSubcategory} from '../../interfaces/Subcategory';
import {AccountsContext} from '../accounts/AccountsContext';
import {AuthContext} from '../auth/AuthContext';
import {CategoriesContext} from '../categories/CategoriesContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';

interface SubcategoriesState {
  isLoading: boolean;
}


interface SubcategoriesContextProps extends SubcategoriesState {
  createSubcategory: (body: CreateSubcategory) => Promise<string | undefined>
  updateSubcategory: (body: UpdateSubcategory, idSubcategory: string) => Promise<string | undefined>;
  removeSubcategory: (idSubcategory: string) => Promise<string | undefined>;
}



export const SubcategoriesContext = createContext({} as SubcategoriesContextProps)


export const SubcategoriesProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showNotification, handleConnectionFail} = useContext(RequestsStatusContext)
  const {token} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)
  const {actualCategory, updateStateActualCategory} = useContext(CategoriesContext)

  const [isLoading, setIsLoading] = useState(false)

  const createSubcategory = async (body: CreateSubcategory) => {
    if (!token || !actualAccount || !actualCategory) return;

    startLoading()

    try {
      const resp: SubcategoryResponse = await createSubategoryApi({
        body,
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token
      })
      
      if(resp.error) {
        return resp.message
      } else {
        updateStateActualCategory({
          ...actualCategory,
          subcategories: [...actualCategory.subcategories || [], resp.subcategory].sort((a, b) => a.name.localeCompare(b.name))
        })
        showNotification('Subcategoría creada')
      } 
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const updateSubcategory = async (body: UpdateSubcategory, idSubcategory: string) => {
    if (!token || !actualAccount || !actualCategory) return;

    startLoading()

    try {
      const resp: SubcategoryResponse = await updateSubategoryApi({
        body,
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token,
        idSubcategory
      })
      if(resp.error){
        return resp.message
      } else {
        updateStateActualCategory({
          ...actualCategory,
          subcategories: actualCategory.subcategories?.map(
            subcat => subcat.id === idSubcategory
              ? resp.subcategory
              : subcat
          )
        })
        showNotification('Subcategoría actualizada')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally{
      finishLoading()
    }
  }


  const removeSubcategory = async (idSubcategory: string) => {
    if (!token || !actualAccount || !actualCategory) return;

    startLoading()

    try {
      const resp: SubcategoryResponse = await removeSubategoryApi({
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token,
        idSubcategory
      })
      if(resp.error){
        return resp.message
      } else {
        updateStateActualCategory({
          ...actualCategory,
          subcategories: actualCategory.subcategories?.filter(subcat => subcat.id !== idSubcategory)
        })
        showNotification('Subcategoría eliminada')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const startLoading = () => {
		setIsLoading(true)
	};

	const finishLoading = () => {
		setIsLoading(false)
	};


  return (
    <SubcategoriesContext.Provider
      value={{
        isLoading,
        createSubcategory,
        updateSubcategory,
        removeSubcategory
      }}
    >
      {children}
    </SubcategoriesContext.Provider>
  )
}