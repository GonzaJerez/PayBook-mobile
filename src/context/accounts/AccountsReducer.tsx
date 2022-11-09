import {Account} from '../../interfaces/Account';

export interface AccountsState {
  allAccounts:    Account[];
  actualAccount:  Account | null;
  isLoading:      boolean;
}

type AccountsActions = 
  | {type: 'setAccounts', payload: {accounts: Account[]}}
  | {type: 'changeActualAccount', payload: {idAccount: string}}
  | {type: 'createAccount', payload: {account: Account}}
  | {type: 'updateAccount', payload: {account: Account}}
  | {type: 'joinToAccount', payload: {account: Account}}
  | {type: 'leaveAccount', payload: {idAccount: string}}
  // | {type: 'removeAccount', payload: {idAccount: string}}
  // | {type: 'getCategories', payload: {categories: Category[]}}

export const AccountsReducer = (state:AccountsState, action: AccountsActions):AccountsState =>{

  switch (action.type) {

    case 'setAccounts':
      return {
        ...state,
        allAccounts: action.payload.accounts,
        actualAccount: action.payload.accounts[0]
      }

    case 'changeActualAccount':
      return {
        ...state,
        actualAccount: state.allAccounts.find( account => account.id === action.payload.idAccount) || null
      }

    case 'createAccount':
      return {
        ...state,
        allAccounts: [...state.allAccounts, action.payload.account],
        actualAccount: action.payload.account
      }

    case 'updateAccount':
      return {
        ...state,
        actualAccount: action.payload.account
      }

    case 'joinToAccount':
      return {
        ...state,
        actualAccount: action.payload.account,
        allAccounts: [...state.allAccounts, action.payload.account]
      }

    case 'leaveAccount':
      return {
        ...state,
        allAccounts: state.allAccounts.filter(account => account.id !== action.payload.idAccount),
        actualAccount: state.allAccounts.find( account => account.id !== action.payload.idAccount) || null,
      }
      
    // case 'removeAccount':
    //   return {
    //     ...state,
    //     allAccounts: state.allAccounts.filter(account => account.id !== action.payload.idAccount),
    //     actualAccount: state.allAccounts.find( account => account.id !== action.payload.idAccount) || null,
    //   }

    // case 'getCategories':
    //   return {
    //     ...state,
    //     categories: action.payload.categories
    //   }
  
    default:
      return state;
  }
}