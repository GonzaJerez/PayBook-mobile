import {createContext, useContext} from 'react';
import {createSubategoryApi, removeSubategoryApi, updateSubategoryApi} from '../../api/subcategories-api';
import {CreateSubcategory, SubcategoryResponse, UpdateSubcategory} from '../../interfaces/Subcategory';
import {AccountsContext} from '../accounts/AccountsContext';
import {AuthContext} from '../auth/AuthContext';
import {CategoriesContext} from '../categories/CategoriesContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';


interface SubcategoriesContextProps {
  createSubcategory: (body: CreateSubcategory) => Promise<void>;
  updateSubcategory: (body: UpdateSubcategory, idSubcategory: string) => Promise<void>;
  removeSubcategory: (idSubcategory: string) => Promise<void>;
}


export const SubcategoriesContext = createContext({} as SubcategoriesContextProps)


export const SubcategoriesProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showStatus, setSuccessStatus, setFailureStatus, handleConnectionFail} = useContext(RequestsStatusContext)
  const {token} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)
  const {actualCategory, updateStateActualCategory} = useContext(CategoriesContext)

  const createSubcategory = async (body: CreateSubcategory) => {
    if (!token || !actualAccount || !actualCategory?.subcategories) return;

    showStatus({
      failureMessage: 'No se pudo crear subcategoría',
      loadingMessage: 'Creando...',
      successMessage: 'Subcategoría creada'
    })

    try {
      const resp: SubcategoryResponse = await createSubategoryApi({
        body,
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token
      })
      if(!existError(resp)){
        updateStateActualCategory({
          ...actualCategory,
          subcategories: [...actualCategory.subcategories, resp.subcategory].sort((a, b) => a.name.localeCompare(b.name))
        })
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const updateSubcategory = async (body: UpdateSubcategory, idSubcategory: string) => {
    if (!token || !actualAccount || !actualCategory) return;

    showStatus({
      failureMessage: 'No se pudo actualizar subcategoría',
      loadingMessage: 'Actualizando...',
      successMessage: 'Subcategoría actualizada'
    })

    try {
      const resp: SubcategoryResponse = await updateSubategoryApi({
        body,
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token,
        idSubcategory
      })
      if(!existError(resp)){
        updateStateActualCategory({
          ...actualCategory,
          subcategories: actualCategory.subcategories?.map(
            subcat => subcat.id === idSubcategory
              ? resp.subcategory
              : subcat
          )
        })
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const removeSubcategory = async (idSubcategory: string) => {
    if (!token || !actualAccount || !actualCategory) return;

    showStatus({
      failureMessage: 'No se pudo eliminar subcategoría',
      loadingMessage: 'Eliminando...',
      successMessage: 'Subcategoría eliminada'
    })

    try {
      const resp: SubcategoryResponse = await removeSubategoryApi({
        idAccount: actualAccount.id,
        idCategory: actualCategory.id,
        token,
        idSubcategory
      })
      if(!existError(resp)){
        updateStateActualCategory({
          ...actualCategory,
          subcategories: actualCategory.subcategories?.filter(subcat => subcat.id !== idSubcategory)
        })
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const existError = (resp: SubcategoryResponse) => {
    let existError = false;
    if (resp.statusCode !== 200 && resp.message) {
      setFailureStatus()
      existError = true;
    }
    return existError;
  }


  return (
    <SubcategoriesContext.Provider
      value={{
        createSubcategory,
        updateSubcategory,
        removeSubcategory
      }}
    >
      {children}
    </SubcategoriesContext.Provider>
  )
}