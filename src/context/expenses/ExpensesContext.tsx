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
  createExpense: (body: CreateExpense) => Promise<string | undefined>;
  updateExpense: (body: UpdateExpense) => Promise<string | undefined>;
  removeExpense: () => Promise<string | undefined>;
  payInstallment: (body: PayInstallment, idCreditPayment: string) => Promise<string | undefined>;
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
  },
  isLoading: false,
}


export const ExpensesContext = createContext({} as ExpensesContextProps)


export const ExpensesProvider = ({children}: {children: JSX.Element | JSX.Element[]}) => {

  const {showNotification, handleConnectionFail} = useContext(RequestsStatusContext)
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
      if(!resp.error){
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
      if(!resp.error){
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
      if(!resp.error){
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

    startLoading()

    try {
      const resp: ExpenseResponse = await createExpenseApi({
        idAccount: actualAccount?.id,
        token,
        body,
      })
      if(resp.error){
        return resp.message
      } else {
        dispatch({type: 'createExpense', payload: {expense: resp.expense}})
        showNotification('Nuevo gasto creado')
        getPrincipalAmounts()
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const updateExpense = async (body: UpdateExpense) => {
    if (!token || !actualAccount || !state.actualExpense) return;

    startLoading()

    try {
      const resp: ExpenseResponse = await updateExpenseApi({
        idExpense: state.actualExpense.id,
        idAccount: actualAccount?.id,
        token,
        body,
      })
      if(resp.error){
        return resp.message
      } else {
        dispatch({type: 'updateExpense', payload: {expense: resp.expense}})
        showNotification('Gasto actualizado')
        getPrincipalAmounts()
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }


  const removeExpense = async () => {
    if (!token || !actualAccount || !state.actualExpense) return;

    startLoading()

    try {
      const resp:ExpenseResponse = await removeExpenseApi({
        idAccount: actualAccount.id,
        token,
        idExpense: state.actualExpense?.id,
      })
      if(resp.error){
        return resp.message
      } else {
        dispatch({type: 'removeExpense', payload: {expense: state.actualExpense}})
        showNotification('Gasto eliminado')
        getPrincipalAmounts()
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally{
      finishLoading()
    }
  }


  const payInstallment = async (body: PayInstallment, idCreditPayment: string) => {
    if (!token || !actualAccount) return;

    startLoading()

    try {
      const resp: ExpenseResponse = await payInstallmentApi({
        idAccount: actualAccount.id,
        token,
        body,
        idCreditPayment
      })
      if(resp.error){
        return resp.message;
      } else {
        dispatch({type: 'createExpense', payload: {expense: resp.expense}})
        showNotification('Cuota pagada')
        getPrincipalAmounts()
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
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
      if(!resp.error){
        return resp;
      }

    } catch (error) {
      handleConnectionFail()
    }
  }


  const setActualExpense = async (expense: Expense) => {
    dispatch({type: 'setExpense', payload: {expense}})
  }

  const startLoading = () => {
		dispatch({ type: 'startLoading' });
	};

	const finishLoading = () => {
		dispatch({ type: 'finishLoading' });
	};

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