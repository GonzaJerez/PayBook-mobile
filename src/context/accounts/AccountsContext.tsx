import {createContext, useContext, useEffect, useReducer} from 'react';
import {createAccountApi, getAccountsApi, joinToAccountApi, leaveAccountApi, pushoutApi, removeAccountApi, updateAccountApi} from '../../api/accounts-api';
import {AccountResponse, CreateAccount, GetAccountsProps, UpdateAccount} from '../../interfaces/Account';
import {AuthContext} from '../auth/AuthContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';
import {AccountsReducer, AccountsState} from './AccountsReducer';

interface AccountsContextProps extends AccountsState {
  changeActualAccount: (idAccount: string) => void;
  createAccount: (body: CreateAccount) => Promise<void>;
  updateAccount: (body: UpdateAccount) => Promise<void>;
  updateUsersInAccount: (body: UpdateAccount, uids: string[]) => Promise<void>;
  joinToAccount: (access_key: string) => Promise<void>;
  leaveAccount: () => Promise<void>;
  removeAccount: () => Promise<void>;
}


const initialValues:AccountsState = {
  actualAccount: null,
  allAccounts: [],
  isLoading: false
}


export const AccountsContext = createContext({} as AccountsContextProps)


export const AccountsProvider = ({children}:{children:JSX.Element | JSX.Element[]})=>{

  const {token} = useContext(AuthContext)
  const {showStatus, setSuccessStatus, setFailureStatus, handleConnectionFail} = useContext(RequestsStatusContext)

  const [state, dispatch] = useReducer(AccountsReducer, initialValues)
  

  useEffect(()=>{
    setAccounts()
  },[])

  const setAccounts = async()=>{
    if(!token) return;
    try {
      const resp:GetAccountsProps = await getAccountsApi(token)

      if(!existError(resp)){
        dispatch({type:'setAccounts', payload: {accounts: resp.accounts}})
      }
      
    } catch (error) {
      handleConnectionFail()
    }
  }


  const changeActualAccount = (idAccount:string) => {
    dispatch({type:'changeActualAccount', payload:{idAccount}})
  }


  const createAccount = async(body:CreateAccount)=>{
    if(!token) return;

    showStatus({
      failureMessage: 'No se pudo crear',
      loadingMessage: 'Creando...',
      successMessage: 'Cuenta creada'
    })

    try {
      const resp:AccountResponse = await createAccountApi(body, token)
      if(!existError(resp)){
        dispatch({type:'createAccount', payload:{account:resp.account}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const updateAccount = async(body: UpdateAccount) => {
    if(!state.actualAccount || !token) return

    showStatus({
      failureMessage: 'No se pudo actualizar',
      loadingMessage: 'Actualizando...',
      successMessage: 'Cuenta actualizada'
    })

    try {
      const resp:AccountResponse = await updateAccountApi(body, state.actualAccount.id, token)
      if(!existError(resp)){
        dispatch({type:'updateAccount', payload:{account: resp.account}})
        setSuccessStatus()
      }
      
    } catch (error) {
      handleConnectionFail()
    }
  }

  const updateUsersInAccount = async(body: UpdateAccount, uids:string[])=>{
    if(!state.actualAccount || !token) return

    showStatus({
      failureMessage: 'No se pudo actualizar',
      loadingMessage: 'Actualizando...',
      successMessage: 'Cuenta actualizada'
    })
    
    try {
      const respUpdate:AccountResponse = await updateAccountApi(body, state.actualAccount.id, token)
      const respPushout:AccountResponse = await pushoutApi(uids, state.actualAccount.id, token)

      if(!existError(respUpdate) && !existError(respPushout)){
        dispatch({type:'updateAccount', payload:{account:respPushout.account}})
        setSuccessStatus()
      }


    } catch (error) {
      handleConnectionFail()
    }
  }

  const joinToAccount = async(access_key:string)=>{
    if(!state.actualAccount || !token) return;

    showStatus({
      failureMessage: 'No te pudiste unir',
      loadingMessage: 'Uniendote...',
      successMessage: 'Te uniste a la cuenta'
    })

    try {
      const resp:AccountResponse = await joinToAccountApi(access_key, token)
      if(!existError(resp)){
        dispatch({type:'joinToAccount', payload:{account:resp.account}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const leaveAccount = async ()=>{
    if(!state.actualAccount || !token) return;

    showStatus({
      failureMessage: 'No pudiste abandonar correctamente',
      loadingMessage: 'Abandonando cuenta...',
      successMessage: 'Abandonaste la cuenta'
    })

    try {
      const resp:AccountResponse = await leaveAccountApi(state.actualAccount.id, token)
      if(!existError(resp)){
        dispatch({type:'leaveAccount', payload:{idAccount: state.actualAccount.id}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const removeAccount = async ()=>{
    if(!state.actualAccount || !token) return;

    showStatus({
      failureMessage: 'No se pudo eliminar la cuenta',
      loadingMessage: 'Eliminando cuenta...',
      successMessage: 'Cuenta eliminada'
    })

    try {
      const resp:AccountResponse = await removeAccountApi(state.actualAccount.id, token)
      if(!existError(resp)){
        dispatch({type:'leaveAccount', payload:{idAccount: state.actualAccount.id}})
        setSuccessStatus()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const existError = (resp: AccountResponse | GetAccountsProps) => {
    let existError = false;
    if (resp.statusCode !== 200 && resp.message) {
      setFailureStatus()
      existError = true;
    }
    return existError;
  }

  return (
    <AccountsContext.Provider 
      value={{
        ...state,
        changeActualAccount,
        createAccount,
        updateAccount,
        updateUsersInAccount,
        joinToAccount,
        leaveAccount,
        removeAccount,
      }}
    >
      {children}
    </AccountsContext.Provider>
  )
}