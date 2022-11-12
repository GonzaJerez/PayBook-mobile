import {Account} from "./Account";
import {Category} from "./Category";
import {CreditPayment} from "./CreditExpenses";
import {Subcategory} from "./Subcategory";
import {User} from "./User";

export interface ExpenseResponse {
  expense:        Expense;
  statusCode?:    number;
  message?:       string;
  error?:         string;
}

export interface Expense {
  id:                 string;
  amount:             number;
  description:        string;
  complete_date:      string;
  num_date:           number;
  month:              number;
  year:               number;
  week:               number;
  day_name:           string;
  account:            Account;
  user:               User;
  category:           Category;
  subcategory:        Subcategory;
  credit_payment?:    CreditPayment;
}

export interface GetExpenses {
  expenses:       Expense[];
  totalExpenses:  number;
  limit:          number;
  skip:           number;
  statusCode?:    number;
  message?:       string;
  error?:         string;
}

export interface CreateExpense {
  amount:         number;
  complete_date:  number;
  description:    string;
  installments:   number;
  categoryId:     string;
  subcategoryId:  string;
}

export interface UpdateExpense {
  amount?:         number;
  complete_date?:  number;
  description?:    string;
  installments?:   number;
  categoryId?:     string;
  subcategoryId?:  string;
}

export interface PrincipalAmountsResponse {
  totalAmountOnMonth:           number | null;
  totalAmountOnWeek:            number | null;
  totalAmountOnDay:             number | null;
  totalAmountFixedCostsMonthly: number | null;
  statusCode?:                  number;
  message?:                     string;
  error?:                       string;
}

export interface PrincipalAmounts {
  title: string;
  amount: number | null;
}

export interface StatisticsResponse {
  expenses:     Expense[];
  totalAmount:  number;
  totalAmountsForCategories:    AmountByFilter;
  totalAmountsForSubcategories: AmountByFilter;
  amountsForMonthInActualYear:  ExpensesForMonth[];
  statusCode?:                  number;
  message?:                     string;
  error?:                       string;
}

export interface AmountByFilter {
    [x: string]: number;
}

export interface ExpensesForMonth {
  month: number;
  totalAmount: number;
}

export interface FiltersStatisctics {
  min_amount?:    string;
  max_amount?:    string;
  num_date?:      string[];
  month?:         string[];
  year?:          string[];
  day_name?:      string[];
  users?:         string[];
  categories?:    string[];
  subcategories?: string[];
}