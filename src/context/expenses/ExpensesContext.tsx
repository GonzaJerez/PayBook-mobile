import {createContext, useContext, useEffect, useReducer} from 'react';
import {createExpenseApi, getExpensesApi, getPrincipalAmountsApi, payInstallmentApi, removeExpenseApi, statisticsApi, updateExpenseApi} from '../../api/expenses-api';
import {PayInstallment} from '../../interfaces/CreditExpenses';
import {CreateExpense, Expense, ExpenseResponse, FiltersStatisctics, GetExpenses, PrincipalAmountsResponse, StatisticsResponse, UpdateExpense} from '../../interfaces/Expense';
import {PaginationQuerys} from '../../interfaces/Querys';
import {AccountsContext} from '../accounts/AccountsContext';
import {AuthContext} from '../auth/AuthContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';
import {ExpensesReducer, ExpensesState} from './ExpensesReducer';

interface ExpensesContextProps extends ExpensesState {
  getPrincipalAmounts: () => Promise<void>;
  getLastExpenses: (querys?: PaginationQuerys) => Promise<void>;
  getAllExpenses: (querys?: PaginationQuerys) => Promise<{expenses: Expense[];} | undefined>;
  setActualExpense: (expense: Expense) => Promise<void>;
  createExpense: (body: CreateExpense) => Promise<void>;
  updateExpense: (body: UpdateExpense) => Promise<void>;
  removeExpense: () => Promise<void>;
  payInstallment: (body: PayInstallment, idCreditPayment: string) => Promise<void>;
  getStatistics: (body?: FiltersStatisctics) => Promise<StatisticsResponse | undefined>
}


const initialValues: ExpensesState = {
  actualExpense: null,
  lastExpenses: [],
  principalAmounts: {
    totalAmountOnMonth: null,
    totalAmountOnWeek: null,
    totalAmountOnDay: null,
    totalAmountFixedCostsMonthly: null
  }
}


export const ExpensesContext = createContext({} as ExpensesContextProps)


export const ExpensesProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showStatus, setSuccessStatus, setFailureStatus, handleConnectionFail} = useContext(RequestsStatusContext)
  const {token} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)

  const [state, dispatch] = useReducer(ExpensesReducer, initialValues)


  useEffect(() => {
    getPrincipalAmounts()
  }, [actualAccount])


  const getPrincipalAmounts = async () => {
    if (!token || !actualAccount) return;

    try {
      const resp: PrincipalAmountsResponse = await getPrincipalAmountsApi({
        idAccount: actualAccount?.id,
        token
      })
      if(!existError(resp)){
        dispatch({type: 'setPrincipalAmounts', payload: {principalAmounts: resp}})
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const getLastExpenses = async (querys?: PaginationQuerys) => {
    if (!token || !actualAccount) return;

    try {
      const resp: GetExpenses = await getExpensesApi({
        idAccount: actualAccount.id,
        token,
        querys
      })
      if(!existError(resp)){
        dispatch({type: 'setLastExpenses', payload: {lastExpenses: resp.expenses}})
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const getAllExpenses = async (querys?: PaginationQuerys) => {
    if (!token || !actualAccount) return;

    try {
      const resp: GetExpenses = await getExpensesApi({
        idAccount: actualAccount.id,
        token,
        querys
      })
      if(!existError(resp)){
        return {
          expenses: resp.expenses
        }
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const createExpense = async (body: CreateExpense) => {
    if (!token || !actualAccount) return;

    showStatus({
      failureMessage: 'No se pudo crear',
      loadingMessage: 'Creando...',
      successMessage: 'Gasto creado'
    })

    try {
      const resp: ExpenseResponse = await createExpenseApi({
        idAccount: actualAccount?.id,
        token,
        body,
      })
      if(!existError(resp)){
        dispatch({type: 'createExpense', payload: {expense: resp.expense}})
        setSuccessStatus()
        getPrincipalAmounts()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }

  const updateExpense = async (body: UpdateExpense) => {
    if (!token || !actualAccount || !state.actualExpense) return;

    showStatus({
      failureMessage: 'No se pudo actualizar',
      loadingMessage: 'Actualizando...',
      successMessage: 'Gasto actualizado'
    })

    try {
      const resp: ExpenseResponse = await updateExpenseApi({
        idExpense: state.actualExpense.id,
        idAccount: actualAccount?.id,
        token,
        body,
      })
      if(!existError(resp)){
        dispatch({type: 'updateExpense', payload: {expense: resp.expense}})
        setSuccessStatus()
        getPrincipalAmounts()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const removeExpense = async () => {
    if (!token || !actualAccount || !state.actualExpense) return;

    showStatus({
      failureMessage: 'No se pudo eliminar',
      loadingMessage: 'Eliminando...',
      successMessage: 'Gasto eliminado'
    })

    try {
      const resp = await removeExpenseApi({
        idAccount: actualAccount.id,
        token,
        idExpense: state.actualExpense?.id,
      })
      if(!existError(resp)){
        dispatch({type: 'removeExpense', payload: {expense: state.actualExpense}})
        setSuccessStatus()
        getPrincipalAmounts()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const payInstallment = async (body: PayInstallment, idCreditPayment: string) => {
    if (!token || !actualAccount) return;

    showStatus({
      failureMessage: 'No se pudo crear gasto',
      loadingMessage: 'Creando gasto',
      successMessage: 'Gasto creado'
    })

    try {
      const resp: ExpenseResponse = await payInstallmentApi({
        idAccount: actualAccount.id,
        token,
        body,
        idCreditPayment
      })
      if(!existError(resp)){
        dispatch({type: 'createExpense', payload: {expense: resp.expense}})
        setSuccessStatus()
        getPrincipalAmounts()
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const getStatistics = async (body?: FiltersStatisctics) => {
    if (!token || !actualAccount) return;

    try {
      const resp: StatisticsResponse = await statisticsApi({
        idAccount: actualAccount.id,
        token,
        body
      })
      if(!existError(resp)){
        return resp;
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const setActualExpense = async (expense: Expense) => {
    dispatch({type: 'setExpense', payload: {expense}})
  }


  const existError = (resp: PrincipalAmountsResponse | GetExpenses | ExpenseResponse | StatisticsResponse) => {
    let existError = false;
    if (resp.statusCode !== 200 && resp.message) {
      setFailureStatus()
      existError = true;
    }
    return existError;
  }



  return (
    <ExpensesContext.Provider
      value={{
        ...state,
        getPrincipalAmounts,
        getLastExpenses,
        getAllExpenses,
        setActualExpense,
        createExpense,
        updateExpense,
        removeExpense,
        payInstallment,
        getStatistics
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}