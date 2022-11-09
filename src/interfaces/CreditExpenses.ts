import {Expense} from "./Expense";

export interface PayInstallment {
  amount:         number;
  complete_date:  number;
  description?:   string;
}

export interface UpdateCreditPayment {
  installments?: number;
  name?:         string;
}

export interface CreditPayment {
  id:                string;
  installments:      number;
  installments_paid: number;
  isActive:          boolean;
  name:              string;
  expenses:          Expense[];
}

export interface CreditPaymentResponse{
  credit_payment: CreditPayment;
  statusCode?:     number;
  message?:        string;
  error?:          string;
}

export interface GetCreditPayments {
  credit_payments: CreditPayment[];
  statusCode?:     number;
  message?:        string;
  error?:          string;
}