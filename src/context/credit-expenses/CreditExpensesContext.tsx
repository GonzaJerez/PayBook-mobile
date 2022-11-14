import {createContext, useContext, useEffect, useReducer} from 'react';
import {getCreditPaymentsApi, removeCreditPaymentsApi, updateCreditPaymentsApi} from '../../api/credit-payments-api';
import {CreditPayment, CreditPaymentResponse, GetCreditPayments} from '../../interfaces/CreditExpenses';
import {UpdateExpense} from '../../interfaces/Expense';
import {AccountsContext} from '../accounts/AccountsContext';
import {AuthContext} from '../auth/AuthContext';
import {ExpensesContext} from '../expenses/ExpensesContext';
import {RequestsStatusContext} from '../requests-status/RequestsStatusContext';
import {CreditExpensesReducer, CreditExpenseState} from './CreditExpensesReducer';


interface CreditExpensesProps extends CreditExpenseState {
  getCreditPayments: ({ pending }: {pending?: boolean | undefined;}) => Promise<void>;
  setActualCreditExpense: (creditExpense: CreditPayment) => void;
  updateCreditExpense: (body: UpdateExpense) => Promise<string | undefined>;
  removeCreditExpense: () => Promise<string | undefined>;
}

const initialValues:CreditExpenseState = {
  actualCreditExpense: null,
  allCreditExpenses: [],
  isLoading: false,
}


export const CreditExpensesContext = createContext({} as CreditExpensesProps)


export const CreditExpensesProvider = ({children}:{children:JSX.Element | JSX.Element[]}) => {

  const {showNotification, handleConnectionFail} = useContext(RequestsStatusContext)
  const {token} = useContext(AuthContext)
  const {actualAccount} = useContext(AccountsContext)
  const {getLastExpenses, getPrincipalAmounts} = useContext(ExpensesContext)
  
  const [state, dispatch] = useReducer(CreditExpensesReducer, initialValues)


  const getCreditPayments = async({pending=true}:{pending?:boolean})=>{
    if(!token || !actualAccount) return;
    
    try {
      const resp:GetCreditPayments = await getCreditPaymentsApi({
        idAccount: actualAccount.id,
        token,
        pending
      })
      if(!resp.error){
        dispatch({type: 'setCreditExpenses', payload:{creditExpenses: resp.credit_payments}})
      }
      
    } catch (error) {
      handleConnectionFail();
    }
  }

  const setActualCreditExpense = (creditExpense:CreditPayment) => {
    dispatch({type:'setActualCreditExpense', payload:{creditExpense}})
  }


  const updateCreditExpense = async (body:UpdateExpense)=>{
    if(!token || !actualAccount || !state.actualCreditExpense) return;

    startLoading()

    try {
      const resp:CreditPaymentResponse = await updateCreditPaymentsApi({
        idAccount: actualAccount.id,
        body,
        idCreditPayment: state.actualCreditExpense.id,
        token
      })
      if(resp.error){
        return resp.message
      } else {
        dispatch({type:'updateCreditExpense', payload:{creditExpense:resp.credit_payment}})
        showNotification('Actualizado')
      }
    } 
    catch (error) {
      handleConnectionFail()
    }
    finally {
      finishLoading()
    }
  }

  const removeCreditExpense = async ()=>{
    if(!token || !actualAccount || !state.actualCreditExpense) return;

    startLoading()

    try {
      const resp:CreditPaymentResponse = await removeCreditPaymentsApi({
        idAccount: actualAccount.id,
        idCreditPayment: state.actualCreditExpense.id,
        token
      })
      if(resp.error){
        return resp.message
      } else {
        dispatch({type:'removeCreditExpense', payload:{idCreditExpense:state.actualCreditExpense.id}})
        getPrincipalAmounts()
        getLastExpenses()
        showNotification('Eliminado')
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
		dispatch({ type: 'startLoading' });
	};

	const finishLoading = () => {
		dispatch({ type: 'finishLoading' });
	};

  return (
    <CreditExpensesContext.Provider
      value={{
        ...state,
        getCreditPayments,
        setActualCreditExpense,
        updateCreditExpense,
        removeCreditExpense
      }}
    >
      {children}
    </CreditExpensesContext.Provider>
  )
}